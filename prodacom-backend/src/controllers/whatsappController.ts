import { Request, Response, Router } from 'express';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '../config/socket/types';
import * as whatsappService from '../services/whatsappService';

export function whatsappController(io: Server<ClientToServerEvents, ServerToClientEvents>) {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    // Lógica de verificação da Meta (igual à anterior)
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;

    const validacao = whatsappService.verificarToken(mode, token, challenge);
    if (validacao) {
      res.status(200).send(validacao);
    } else {
      res.sendStatus(403);
    }
  });

  router.post('/', (req: Request, res: Response) => {
    const body = req.body;

    if (body.object && body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const msgRecebida = body.entry[0].changes[0].value.messages[0];
      const telefoneCliente = msgRecebida.from;
      const textoMsg = msgRecebida.text.body;

      // Emite O EVENTO EXCLUSIVO do zap para o painel React
      io.emit('nova_mensagem_whatsapp', {
        contato: telefoneCliente,
        texto: textoMsg,
        hora: new Date().toISOString()
      });
    }

    res.sendStatus(200);
  });

  return router;
}