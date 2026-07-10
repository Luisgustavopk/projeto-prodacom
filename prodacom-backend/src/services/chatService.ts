// src/services/chatService.ts

export interface Mensagem {
  role: 'user' | 'admin' | 'assistant';
  content: string;
  hora: string;
}

export interface EstruturaChat {
  nome: string;
  contato: string;
  idDoCliente: string;
  mensagens: Mensagem[];
}

// O nosso banco de dados em memória
const bancoDeConversas: Record<string, EstruturaChat> = {};

export const chatService = {
  obterTodasAsConversas: () => {
    return bancoDeConversas;
  },

  obterConversa: (contato: string) => {
    return bancoDeConversas[contato];
  },

  criarConversaSeNaoExistir: (contato: string, nome: string, idDoCliente: string) => {
    if (!bancoDeConversas[contato]) {
      bancoDeConversas[contato] = {
        nome,
        contato,
        idDoCliente,
        mensagens: []
      };
    }
  },

  atualizarIdDoCliente: (contato: string, novoId: string) => {
    if (bancoDeConversas[contato]) {
      bancoDeConversas[contato].idDoCliente = novoId;
    }
  },

  adicionarMensagem: (contato: string, mensagem: Mensagem) => {
    if (bancoDeConversas[contato]) {
      bancoDeConversas[contato].mensagens.push(mensagem);
    }
  }
};