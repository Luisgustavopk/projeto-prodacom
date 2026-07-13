
import { Request, Response } from 'express';
import { adminService } from '../services/adminService';

// Função tradicional para lidar com a requisição da rota
export function verificarCodigo(req: Request, res: Response) {
  try {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ autorizado: false, mensagem: "Código não fornecido" });
    }

    const ehValido = adminService.validarCodigoAcesso(codigo);

    if (ehValido) {
      return res.status(200).json({ autorizado: true });
    }

    return res.status(401).json({ autorizado: false, mensagem: "Código incorreto" });
  } catch (error) {
    console.error(" Erro no controlador adminController:", error);
    return res.status(500).json({ autorizado: false, mensagem: "Erro interno no servidor" });
  }
}