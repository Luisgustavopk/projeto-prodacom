// src/socket.ts
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { configurarEventosChat } from './controllers/chatController';

export const iniciarSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(` Novo acesso detectado! ID: ${socket.id}`);
    
    // Repassa a responsabilidade de lidar com as mensagens para o Controller
    configurarEventosChat(io, socket);
  });
};