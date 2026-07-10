
import { MessageModel } from '../models/Message';

// Controle dos IDs de sockets voláteis na memória RAM
const mapeamentoSockets: Record<string, string> = {};

async function obterTodasAsConversas() {
  try {
    const conversasAgrupadas = await MessageModel.aggregate([
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: "$clienteId",
          nome: { $first: "$clienteNome" },
          contato: { $first: "$clienteId" },
          mensagens: {
            $push: {
              role: "$role",
              content: "$content",
              hora: "$hora"
            }
          }
        }
      }
    ]);

    const bancoDeConversas: Record<string, any> = {};
    conversasAgrupadas.forEach(function (chat) {
      bancoDeConversas[chat.contato] = {
        nome: chat.nome,
        contato: chat.contato,
        idDoCliente: mapeamentoSockets[chat.contato] || chat.contato,
        mensagens: chat.mensagens
      };
    });

    return bancoDeConversas;
  } catch (error) {
    console.error(" Erro ao obter todas as conversas do MongoDB:", error);
    return {};
  }
}

async function obterConversa(contato: string) {
  try {
    const mensagens = await MessageModel.find({ clienteId: contato }).sort({ createdAt: 1 });
    if (mensagens.length === 0) return null;

    return {
      nome: mensagens[0].clienteNome,
      contato,
      idDoCliente: mapeamentoSockets[contato] || contato,
      mensagens: mensagens.map(function (m) {
        return { role: m.role, content: m.content, hora: m.hora };
      })
    };
  } catch (error) {
    console.error(`Erro ao obter conversa do contato ${contato}:`, error);
    return null;
  }
}

function criarConversaSeNaoExistir(contato: string, nome: string, idDoCliente: string) {
  if (!mapeamentoSockets[contato]) {
    mapeamentoSockets[contato] = idDoCliente;
  }
}

function atualizarIdDoCliente(contato: string, novoId: string) {
  mapeamentoSockets[contato] = novoId;
}

async function adicionarMensagem(
  contato: string, 
  mensagem: { role: "user" | "admin"; content: string; hora: string }, 
  clienteNome: string
) {
  try {
    await MessageModel.create({
      clienteId: contato,
      clienteNome: clienteNome,
      role: mensagem.role,
      content: mensagem.content,
      hora: mensagem.hora
    });
    console.log(` [MONGO] Mensagem de [${mensagem.role}] salva para o contato: ${contato}`);
  } catch (error) {
    console.error(" Erro ao salvar mensagem no MongoDB:", error);
  }
}

export const chatService = {
  obterTodasAsConversas,
  obterConversa,
  criarConversaSeNaoExistir,
  atualizarIdDoCliente,
  adicionarMensagem
};