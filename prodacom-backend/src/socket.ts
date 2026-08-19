import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { configurarEventosChat } from './controllers/chatController';
import { configurarEventosWhatsapp } from './whatsappSocket'; 
import { ClientToServerEvents, ServerToClientEvents } from './config/socket/types';


export function iniciarSocket(server: HttpServer): Server<ClientToServerEvents, ServerToClientEvents> {

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', function (socket: any) {
    console.log(`Novo acesso detectado! ID: ${socket.id}`);
    configurarEventosChat(io, socket);
    
    configurarEventosWhatsapp(io, socket);
  });

  return io;
}