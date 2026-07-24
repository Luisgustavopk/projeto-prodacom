import { NotificacaoModel } from '../models/Notificacao';
import { emailService } from './emailService';
import { CHAT_CONFIG } from '../config/chatConfig';


const temporizadoresPendentes = new Map<string, NodeJS.Timeout>();

export const notificacaoService = {

  async registrarNovoCliente(contato: string, autor: string, texto: string) {
    try {
      await NotificacaoModel.create({
        tipo: 'NOVO_CLIENTE_CHAT',
        titulo: `Novo Cliente: ${autor}`,
        mensagem: texto,
        clienteContato: contato,
        clienteNome: autor
      });

      await emailService.enviarNotificacaoNovoClienteChat({
        nome: autor,
        contato,
        mensagem: texto
      });
    } catch (error) {
      console.error('[NOTIFICACAO] Erro ao registrar novo cliente:', error);
    }
  },

  agendarAlerta15Minutos(contato: string, autor: string, texto: string) {
  
    this.cancelarAlerta(contato);

    const timer = setTimeout(async () => {
      console.log(`[ALERTA 15MIN] Cliente ${autor} (${contato}) não foi atendido a tempo.`);

      try {
        await NotificacaoModel.create({
          tipo: 'MENSAGEM_PENDENTE',
          titulo: `Atendimento Pendente: ${autor}`,
          mensagem: texto,
          clienteContato: contato,
          clienteNome: autor
        });

        await emailService.enviarAlertaMensagemPendente({
          nome: autor,
          contato,
          mensagem: texto,
          tempoAguardando: '15 minutos'
        });
      } catch (error) {
        console.error('[NOTIFICACAO] Erro ao disparar alerta de 15 min:', error);
      } finally {
        temporizadoresPendentes.delete(contato);
      }
    }, CHAT_CONFIG.TEMPO_LIMITE_PENDENCIA_MS);

    temporizadoresPendentes.set(contato, timer);
  },

  
  cancelarAlerta(contato: string) {
    if (temporizadoresPendentes.has(contato)) {
      clearTimeout(temporizadoresPendentes.get(contato)!);
      temporizadoresPendentes.delete(contato);
      console.log(`[ALERTA CANCELADO] Atendimento do cliente ${contato} assumido pelo Admin.`);
    }
  },

  
  async marcarComoLido(contato: string) {
    this.cancelarAlerta(contato);

    try {
      await NotificacaoModel.updateMany(
        { clienteContato: contato, lida: false },
        { lida: true }
      );
    } catch (error) {
      console.error('[NOTIFICACAO] Erro ao marcar notificações como lidas:', error);
    }
  }
};