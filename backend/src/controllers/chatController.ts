// src/controllers/chatController.ts
import { Server, Socket } from 'socket.io';
import { chatService } from '../services/chatService';

interface DadosMensagem {
  texto: string;
  autor: string;
  contato: string;
  hora: string;
  salaDestino?: string;
}

export const configurarEventosChat = (io: Server, socket: Socket) => {
  
  // 1. ADMIN ENTROU
  socket.on('entrar_como_admin', () => {
    socket.join('admins');
    console.log(`👨‍💼 Admin (${socket.id}) entrou no painel.`);
    // Puxa as conversas limpinhas do Service
    socket.emit('sincronizar_conversas_existentes', chatService.obterTodasAsConversas());
  });

  // 2. CLIENTE DEU F5
  socket.on('cliente_reconectado', (dados: { contato: string; nome: string }) => {
    const salaNome = `sala_${dados.contato}`;
    socket.join(salaNome);
    
    console.log(`🔄 Cliente ${dados.nome} reconectado na sala: ${salaNome}`);

    if (chatService.obterConversa(dados.contato)) {
      chatService.atualizarIdDoCliente(dados.contato, socket.id);
      io.to('admins').emit('cliente_atualizou_conexao', {
        contato: dados.contato,
        novoId: socket.id
      });
    }
  });

  // 3. FLUXO DE MENSAGENS
  socket.on('enviar_mensagem', (dados: DadosMensagem) => {
    const { texto, autor, contato, hora, salaDestino } = dados;

    // ADMIN RESPONDENDO
    if (salaDestino) {
      console.log(`[Admin] enviando resposta para a sala_ ${salaDestino}`);
      chatService.adicionarMensagem(salaDestino, { role: 'admin', content: texto, hora });
      io.to(`sala_${salaDestino}`).emit('receber_mensagem', { autor: 'Admin', texto, hora });
    } 
    // CLIENTE PERGUNTANDO
    else {
      const salaNome = `sala_${contato}`;
      socket.join(salaNome);

      console.log(`[Cliente] ${autor} enviou mensagem na sala: ${salaNome}`);

      // Delega a lógica de salvar para o Service
      chatService.criarConversaSeNaoExistir(contato, autor, socket.id);
      chatService.atualizarIdDoCliente(contato, socket.id);
      chatService.adicionarMensagem(contato, { role: 'user', content: texto, hora });

      const pacoteParaAdmin = { idDoCliente: contato, autor, contato, texto, hora };
      io.to('admins').emit('nova_mensagem_cliente', pacoteParaAdmin);
      io.to(salaNome).emit('receber_mensagem', { autor, texto, hora });
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Conexão encerrada: ${socket.id}`);
  });
};