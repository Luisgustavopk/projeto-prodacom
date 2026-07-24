
// 1. O formato da mensagem que trafega nos eventos do Socket
export interface ISocketMessage {
  texto: string;
  autor: string;
  contato: string;
  hora: string;
  salaDestino?: string;
}

// 2. Eventos que o Servidor consegue ENVIAR para o Frontend (Admin ou Web)
export interface ServerToClientEvents {
  receber_mensagem: (dados: { autor: string; texto: string; hora: string }) => void;
  sincronizar_conversas_existentes: (conversas: Record<string, any>) => void;
  cliente_atualizou_conexao: (dados: { contato: string; novoId: string }) => void;
  nova_mensagem_cliente: (dados: { idDoCliente: string; autor: string; contato: string; texto: string; hora: string }) => void;
  status_admin: (status: boolean) => void;
  status_cliente: (dados: { contato: string; online: boolean }) => void;
}

// 3. Eventos que o Servidor consegue ESCUTAR vindos do Frontend
export interface ClientToServerEvents {
  entrar_como_admin: () => void;
  cliente_reconectado: (dados: { contato: string; nome: string }) => void;
  enviar_mensagem: (dados: ISocketMessage) => void;
  solicitar_status_admin: () => void;
}