import { Request, Response } from 'express';
import { emailService } from '../services/emailService';
import { validarDadosOrcamento } from '../utils/validators';

export async function enviarOrcamento(req: Request, res: Response) {
  try {
    const dados = req.body;

   
    const erros = validarDadosOrcamento(dados);

    
    if (erros.length > 0) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: erros[0] 
      });
    }

    await emailService.enviarEmailOrcamento(dados);

    return res.status(200).json({ 
      sucesso: true, 
      mensagem: "Orçamento recebido e e-mail enviado com sucesso!" 
    });

  } catch (error) {
    console.error("[ERRO] Falha ao enviar e-mail de orçamento:", error);
    return res.status(500).json({ 
      sucesso: false, 
      mensagem: "Erro interno no servidor ao tentar processar o seu pedido." 
    });
  }
}