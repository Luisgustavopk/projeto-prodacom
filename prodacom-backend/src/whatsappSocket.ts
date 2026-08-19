import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, IWhatsAppMessage } from './config/socket/types';
import * as whatsappService from './services/whatsappService';

export function configurarEventosWhatsapp(
  io: Server<ClientToServerEvents, ServerToClientEvents>, 
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  
  socket.on('enviar_mensagem_whatsapp', async (dados: IWhatsAppMessage) => {
    try {
      await whatsappService.enviarMensagem(dados.contato, dados.texto);
      
      console.log(`✅ WhatsApp enviado para ${dados.contato}`);

      
    } catch (error) {
      console.error('❌ Falha ao enviar WhatsApp pelo Socket.');
    }
  });

}