import axios from 'axios';

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'prodacom_secreto';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID;

/**
 * Função Pura: Apenas verifica se o token bate. 
 * Não mexe com res.send() aqui, o Controller faz isso!
 */
export const verificarToken = (mode: string, token: string, challenge: string): string | null => {
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return challenge;
  }
  return null;
};

/**
 * Função para disparar a mensagem de volta para o cliente no WhatsApp via API da Meta
 */
export const enviarMensagem = async (telefoneDestino: string, texto: string) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: telefoneDestino,
        type: 'text',
        text: { body: texto }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro na API da Meta:', error.response?.data || error.message);
    throw error;
  }
};