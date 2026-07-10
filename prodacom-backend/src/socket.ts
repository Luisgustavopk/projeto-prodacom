
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { configurarEventosChat } from './controllers/chatController';
import { ClientToServerEvents, ServerToClientEvents } from './config/socket/types';

export function iniciarSocket(server: HttpServer) {

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', function (socket: Socket) {
    console.log(` Novo acesso detectado! ID: ${socket.id}`);
    
    
    configurarEventosChat(io, socket);
  });
}