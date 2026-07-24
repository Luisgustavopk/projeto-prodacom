import { Server, Socket } from 'socket.io';
import { chatService } from '../services/chatService'; 
import { notificacaoService } from '../services/notificacaoService';
import { ClientToServerEvents, ServerToClientEvents, ISocketMessage } from '../config/socket/types';

const adminSockets = new Set<string>();

const limparContato = (contato?: string): string => {
  if (!contato) return '';
  return contato.replace(/\D/g, '').trim();
};

export function configurarEventosChat(
  io: Server<ClientToServerEvents, ServerToClientEvents>, 
  socket: Socket
) {

  // 1. Status do Admin
  const handleSolicitarStatusAdmin = () => {
    socket.emit('status_admin', adminSockets.size > 0);
  };

  // 2. Admin Entrou no Painel
  const handleEntrarComoAdmin = async () => {
    socket.join('admins');
    if (!adminSockets.has(socket.id)) {
      adminSockets.add(socket.id);
      io.emit('status_admin', true);
      console.log(`[ADMIN] (${socket.id}) entrou no painel. Admins online: ${adminSockets.size}`);
    }
    const conversas = await chatService.obterTodasAsConversas();
    socket.emit('sincronizar_conversas_existentes', conversas);
  };

  // 3. Cliente Reconectou (Identificação de Online ao dar F5 no site)
  const handleClienteReconectado = async (dados: { contato: string; nome: string }) => {
    const contatoLimpo = limparContato(dados.contato);
    const salaNome = `sala_${contatoLimpo}`;
    
    socket.join(salaNome);

    const ficouOnline = chatService.registrarConexaoCliente(contatoLimpo, socket.id);
    if (ficouOnline) {
      io.to('admins').emit('status_cliente', { contato: contatoLimpo, online: true });
      console.log(`[STATUS] Cliente ${contatoLimpo} ficou ONLINE na sala: ${salaNome}.`);
    }

    const conversaExiste = await chatService.obterConversa(contatoLimpo);
    if (conversaExiste) {
      chatService.atualizarIdDoCliente(contatoLimpo, socket.id);
      io.to('admins').emit('cliente_atualizou_conexao', {
        contato: contatoLimpo,
        novoId: socket.id
      });
    }
  };

  // 4. Fluxo de Envio de Mensagens
  const handleMensagemAdmin = async (salaDestino: string, texto: string, hora: string) => {
    notificacaoService.cancelarAlerta(salaDestino);

    const statusInicial = 'enviado';

    await chatService.adicionarMensagem(
      salaDestino, 
      { role: 'admin', content: texto, hora, status: statusInicial }, 
      'Admin'
    );

    // Transmite a mensagem para a sala do cliente
    io.to(`sala_${salaDestino}`).emit('receber_mensagem', { 
      autor: 'Admin', 
      texto, 
      hora,
      status: statusInicial 
    });
  };

  const handleMensagemCliente = async (contato: string, autor: string, texto: string, hora: string) => {
    const salaNome = `sala_${contato}`;
    socket.join(salaNome);

    const ficouOnline = chatService.registrarConexaoCliente(contato, socket.id);
    if (ficouOnline) {
      io.to('admins').emit('status_cliente', { contato, online: true });
      console.log(`[STATUS] Cliente ${contato} ficou ONLINE.`);
    }

    const conversaExiste = await chatService.obterConversa(contato);

    chatService.criarConversaSeNaoExistir(contato, autor, socket.id);
    chatService.atualizarIdDoCliente(contato, socket.id);
    
    // Salva no banco a mensagem do cliente com status 'enviado'
    await chatService.adicionarMensagem(
      contato, 
      { role: 'user', content: texto, hora, status: 'enviado' }, 
      autor
    );

    // Gerenciamento de Notificação / Timer de 15 Minutos
    if (!conversaExiste) {
      notificacaoService.registrarNovoCliente(contato, autor, texto);
    } else {
      notificacaoService.agendarAlerta15Minutos(contato, autor, texto);
    }

    const pacoteParaAdmin = { idDoCliente: contato, autor, contato, texto, hora, status: 'enviado' as const };
    io.to('admins').emit('nova_mensagem_cliente', pacoteParaAdmin);
    io.to(salaNome).emit('receber_mensagem', { autor, texto, hora, status: 'enviado' });
  };

  const handleEnviarMensagem = async (dados: ISocketMessage) => {
    const { texto, autor, hora } = dados;
    const contatoLimpo = limparContato(dados.contato);
    const salaDestinoLimpa = limparContato(dados.salaDestino);

    if (salaDestinoLimpa) {
      await handleMensagemAdmin(salaDestinoLimpa, texto, hora);
    } else {
      await handleMensagemCliente(contatoLimpo, autor, texto, hora);
    }
  };

  // 5. Marcar Chat como Lido pelo Admin
  const handleMarcarComoLido = async (dados: { contato: string }) => {
    const contatoLimpo = limparContato(dados.contato);
    
    // Zera notificações e timers pendentes
    await notificacaoService.marcarComoLido(contatoLimpo);

    // Atualiza as mensagens enviadas pelo CLIENTE para 'lido' no MongoDB
    await chatService.atualizarStatusMensagens(contatoLimpo, 'user', 'lido');

    // Avisa a sala do cliente que o admin visualizou as mensagens
    io.to(`sala_${contatoLimpo}`).emit('mensagens_visualizadas');
  };

  // 6. Atualização de Status das Mensagens (Entregue / Lido)
  const handleAtualizarStatusMensagem = async (dados: { contato: string; roleTarget: 'user' | 'admin'; status: 'entregue' | 'lido' }) => {
    const contatoLimpo = limparContato(dados.contato);

    await chatService.atualizarStatusMensagens(contatoLimpo, dados.roleTarget, dados.status);

    // Se o cliente visualizou as mensagens do admin, notifica a sala dos admins
    if (dados.roleTarget === 'admin') {
      io.to('admins').emit('status_mensagem_atualizado', {
        contato: contatoLimpo,
        status: dados.status
      });
    }
  };

  // 7. Desconexão
  const handleDisconnect = () => {
    console.log(`Conexão encerrada: ${socket.id}`);

    if (adminSockets.has(socket.id)) {
      adminSockets.delete(socket.id);
      io.emit('status_admin', adminSockets.size > 0);
      console.log(`[ADMIN] Admin desconectado. Restantes: ${adminSockets.size}`);
    } else {
      const resultado = chatService.removerConexaoCliente(socket.id);
      if (resultado?.ficouOffline) {
        io.to('admins').emit('status_cliente', {
          contato: resultado.contato,
          online: false
        });
        console.log(`[STATUS] Cliente ${resultado.contato} ficou OFFLINE.`);
      }
    }
  };

  // --- REGISTRO DOS EVENTOS ---
  socket.on('solicitar_status_admin', handleSolicitarStatusAdmin);
  socket.on('entrar_como_admin', handleEntrarComoAdmin);
  socket.on('cliente_reconectado', handleClienteReconectado);
  socket.on('enviar_mensagem', handleEnviarMensagem);
  socket.on('marcar_como_lido', handleMarcarComoLido);
  socket.on('atualizar_status_mensagem', handleAtualizarStatusMensagem);
  socket.on('disconnect', handleDisconnect);
}