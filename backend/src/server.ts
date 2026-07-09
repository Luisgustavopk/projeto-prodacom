import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

interface DadosMensagem {
  texto: string;
  autor: string;
  contato?: string;
  hora: string;
  salaDestino?: string; 
}

io.on('connection', (socket: Socket) => {
  console.log(`Novo acesso detectado! ID: ${socket.id}`);

  // 1. IDENTIFICANDO O ADMIN
  socket.on('entrar_como_admin', () => {
    socket.join('admins');
    console.log(` O usuário ${socket.id} entrou como Administrador.`);
  });

  // 2. RECEBENDO MENSAGENS
  socket.on('enviar_mensagem', (dados: DadosMensagem) => {
    
  
    if (dados.salaDestino) {
      console.log(`Admin respondendo para a sala: ${dados.salaDestino}`);
      io.to(dados.salaDestino).emit('receber_mensagem', dados);
    } 
   
    else {
      console.log(`Cliente ${dados.autor} enviou uma dúvida.`);
      socket.join(socket.id); 
      
    
      const pacoteParaAdmin = {
        ...dados,
        idDoCliente: socket.id 
      };

      
      io.to('admins').emit('nova_mensagem_cliente', pacoteParaAdmin);
      io.to(socket.id).emit('receber_mensagem', dados);
    }
  });

  socket.on('disconnect', () => {
    console.log(` Conexão encerrada: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor Roteador de Chat rodando na porta ${PORT} 🚀`);
});