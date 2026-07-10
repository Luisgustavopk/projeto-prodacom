
import { Server, Socket } from 'socket.io';
import { chatService } from '../services/chatService';  
import { ClientToServerEvents, ServerToClientEvents } from '../config/socket/types';

export function configurarEventosChat(io: Server<ClientToServerEvents, ServerToClientEvents>, socket: Socket) {
  
  // 1. ADMIN ENTROU
  socket.on('entrar_como_admin', async function () {
    socket.join('admins');
    console.log(` Admin (${socket.id}) entrou no painel.`);
    
    const conversas = await chatService.obterTodasAsConversas();
    socket.emit('sincronizar_conversas_existentes', conversas);
  });

  // 2. CLIENTE RECONECTOU
  socket.on('cliente_reconectado', async function (dados: { contato: string; nome: string }) {
    const salaNome = `sala_${dados.contato}`;
    socket.join(salaNome);
    
    console.log(` Cliente ${dados.nome} reconectado na sala: ${salaNome}`);

    const conversaExiste = await chatService.obterConversa(dados.contato);
    if (conversaExiste) {
      chatService.atualizarIdDoCliente(dados.contato, socket.id);
      io.to('admins').emit('cliente_atualizou_conexao', {
        contato: dados.contato,
        novoId: socket.id
      });
    }
  });

  // 3. FLUXO DE MENSAGENS
  socket.on('enviar_mensagem', async function (dados: any) {
    const { texto, autor, contato, hora, salaDestino } = dados;

    // ADMIN RESPONDENDO
    if (salaDestino) {
      console.log(`[Admin] enviando resposta para a sala: ${salaDestino}`);
      
      await chatService.adicionarMensagem(salaDestino, { role: 'admin', content: texto, hora }, 'Admin');
      io.to(`sala_${salaDestino}`).emit('receber_mensagem', { autor: 'Admin', texto, hora });
    } 
    // CLIENTE PERGUNTANDO
    else {
      const salaNome = `sala_${contato}`;
      socket.join(salaNome);

      console.log(`[Cliente] ${autor} enviou mensagem na sala: ${salaNome}`);

      chatService.criarConversaSeNaoExistir(contato, autor, socket.id);
      chatService.atualizarIdDoCliente(contato, socket.id);
      
      await chatService.adicionarMensagem(contato, { role: 'user', content: texto, hora }, autor);

      const pacoteParaAdmin = { idDoCliente: contato, autor, contato, texto, hora };
      io.to('admins').emit('nova_mensagem_cliente', pacoteParaAdmin);
      io.to(salaNome).emit('receber_mensagem', { autor, texto, hora });
    }
  });

  socket.on('disconnect', function () {
    console.log(`Conexão encerrada: ${socket.id}`);
  });
}