import { Request, Response } from 'express';
import { emailService } from '../services/emailService';

export async function enviarOrcamento(req: Request, res: Response) {
  try {
    const dados = req.body;
    
    if (!dados.nome || !dados.email || !dados.mensagem) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: "Campos obrigatórios (Nome, E-mail e Mensagem) em falta." 
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
      mensagem: "Erro interno no servidor ao tentar enviar o e-mail." 
    });
  }
}