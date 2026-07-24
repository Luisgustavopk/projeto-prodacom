import { MessageModel } from '../models/Message';

const mapeamentoSockets: Record<string, string> = {};
const socketParaContato = new Map<string, string>();
const contatoParaSockets = new Map<string, Set<string>>();


function registrarConexaoCliente(contato: string, socketId: string): boolean {
  const contatoLimpo = contato.trim(); 
  
  socketParaContato.set(socketId, contatoLimpo);

  if (!contatoParaSockets.has(contatoLimpo)) {
    contatoParaSockets.set(contatoLimpo, new Set());
  }

  const sockets = contatoParaSockets.get(contatoLimpo)!;
  const eraOffline = sockets.size === 0;
  sockets.add(socketId);

  return eraOffline;
}

function removerConexaoCliente(socketId: string): { contato: string; ficouOffline: boolean } | null {
  const contato = socketParaContato.get(socketId);
  if (!contato) return null;

  socketParaContato.delete(socketId);
  const sockets = contatoParaSockets.get(contato);

  if (sockets) {
    sockets.delete(socketId);
    if (sockets.size === 0) {
      contatoParaSockets.delete(contato);
      return { contato, ficouOffline: true };
    }
  }

  return { contato, ficouOffline: false };
}

function isClienteOnline(contato: string): boolean {
  const sockets = contatoParaSockets.get(contato.trim());
  return sockets ? sockets.size > 0 : false;
}


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
            $push: { role: "$role", content: "$content", hora: "$hora" }
          }
        }
      }
    ]);

    const bancoDeConversas: Record<string, any> = {};
    
    conversasAgrupadas.forEach(function (chat) {
    
      const contatoLimpo = chat.contato.trim();

      bancoDeConversas[contatoLimpo] = {
        nome: chat.nome,
        contato: contatoLimpo,
        idDoCliente: mapeamentoSockets[contatoLimpo] || contatoLimpo,
        online: isClienteOnline(contatoLimpo), 
        mensagens: chat.mensagens
      };
    });

    return bancoDeConversas;
  } catch (error) {
    console.error("Erro ao obter todas as conversas do MongoDB:", error);
    return {};
  }
}

async function obterConversa(contato: string) {
  const contatoLimpo = contato.trim();
  try {
    const mensagens = await MessageModel.find({ clienteId: contatoLimpo }).sort({ createdAt: 1 });
    if (mensagens.length === 0) return null;

    return {
      nome: mensagens[0].clienteNome,
      contato: contatoLimpo,
      idDoCliente: mapeamentoSockets[contatoLimpo] || contatoLimpo,
      online: isClienteOnline(contatoLimpo),
      mensagens: mensagens.map(m => ({ role: m.role, content: m.content, hora: m.hora }))
    };
  } catch (error) {
    console.error(`Erro ao obter conversa:`, error);
    return null;
  }
}

function criarConversaSeNaoExistir(contato: string, nome: string, idDoCliente: string) {
  const contatoLimpo = contato.trim();
  if (!mapeamentoSockets[contatoLimpo]) {
    mapeamentoSockets[contatoLimpo] = idDoCliente;
  }
}

function atualizarIdDoCliente(contato: string, novoId: string) {
  mapeamentoSockets[contato.trim()] = novoId;
}

async function adicionarMensagem(
  contato: string, 
  mensagem: { role: "user" | "admin"; content: string; hora: string }, 
  clienteNome: string
) {
  try {
    await MessageModel.create({
      clienteId: contato.trim(),
      clienteNome: clienteNome,
      role: mensagem.role,
      content: mensagem.content,
      hora: mensagem.hora
    });
    console.log(`[MONGO] Mensagem de [${mensagem.role}] salva para: ${contato.trim()}`);
  } catch (error) {
    console.error("Erro ao salvar mensagem no MongoDB:", error);
  }
}

export const chatService = {
  obterTodasAsConversas,
  obterConversa,
  criarConversaSeNaoExistir,
  atualizarIdDoCliente,
  adicionarMensagem,
  registrarConexaoCliente,
  removerConexaoCliente,
  isClienteOnline
};