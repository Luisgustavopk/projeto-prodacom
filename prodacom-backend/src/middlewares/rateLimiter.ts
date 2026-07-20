import rateLimit from 'express-rate-limit';

export const limitadorCodigo = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limite de 5 tentativas por IP
  message: { 
    autorizado: false, 
    mensagem: "Muitas tentativas incorretas. Tente novamente mais tarde." 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const limitadorEmail = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limite de 5 e-mails enviados por IP
  message: { 
    sucesso: false, 
    mensagem: "Muitas solicitações enviadas. Tente novamente mais tarde." 
  },
  standardHeaders: true,
  legacyHeaders: false,
});