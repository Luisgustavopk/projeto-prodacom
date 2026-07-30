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
      { $match: { arquivada: { $ne: true } } },
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: "$clienteId",
          nome: { $first: "$clienteNome" },
          contato: { $first: "$clienteId" },
          lastMessageAt: { $last: "$createdAt" },
          mensagens: {
            $push: { 
              id: { $toString: "$_id" },
              role: "$role", 
              content: "$content", 
              hora: "$hora",
              status: { $ifNull: ["$status", "enviado"] },
              apagada: { $ifNull: ["$apagada", false] }
            }
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
        lastMessageAt: chat.lastMessageAt, 
        mensagens: chat.mensagens
      };
    });

    return bancoDeConversas;
  } catch (error) {
    console.error("Erro ao obter conversas:", error);
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
      lastMessageAt: mensagens[mensagens.length - 1].createdAt,
      mensagens: mensagens.map(m => ({ 
        id: m._id.toString(),
        role: m.role, 
        content: m.content, 
        hora: m.hora,
        status: m.status || 'enviado',
        apagada: m.apagada || false
      }))
    };
  } catch (error) {
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
  mensagem: { role: "user" | "admin"; content: string; hora: string; status?: "enviado" | "entregue" | "lido" }, 
  clienteNome: string
) {
  try {
    const novaMsg = await MessageModel.create({
      clienteId: contato.trim(),
      clienteNome: clienteNome,
      role: mensagem.role,
      content: mensagem.content,
      hora: mensagem.hora,
      status: mensagem.status || 'enviado'
    });
    
    return novaMsg._id.toString(); 

  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
    return null;
  }
}

async function arquivarConversa(contato: string) {
  await MessageModel.updateMany({ clienteId: contato.trim() }, { arquivada: true });
}

async function desarquivarConversa(contato: string) {
  await MessageModel.updateMany({ clienteId: contato.trim() }, { arquivada: false });
}

async function apagarMensagem(idMensagem: string) {
  try {
    await MessageModel.findByIdAndUpdate(idMensagem, { apagada: true, content: "Mensagem apagada" });
  } catch (error) {
    console.error("Erro ao apagar:", error);
  }
}

async function atualizarStatusMensagens(contato: string, roleTarget: "user" | "admin", novoStatus: "entregue" | "lido") {
  try {
    const contatoLimpo = contato.trim();
    await MessageModel.updateMany(
      { clienteId: contatoLimpo, role: roleTarget, status: { $ne: 'lido' } },
      { $set: { status: novoStatus } }
    );
  } catch (error) {}
}

export const chatService = {
  obterTodasAsConversas, obterConversa, criarConversaSeNaoExistir, atualizarIdDoCliente,
  adicionarMensagem, atualizarStatusMensagens, apagarMensagem, registrarConexaoCliente,
  removerConexaoCliente, desarquivarConversa, arquivarConversa, isClienteOnline
};