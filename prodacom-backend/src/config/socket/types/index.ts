export interface ISocketMessage {
  id?: string;
  texto: string;
  autor: string;
  contato: string;
  hora: string;
  salaDestino?: string;
  status?: 'enviado' | 'entregue' | 'lido'; 
}

export interface ServerToClientEvents {
  receber_mensagem: (dados: { 
    autor: string; 
    texto: string; 
    hora: string; 
    status?: 'enviado' | 'entregue' | 'lido'; 
  }) => void;
  
  sincronizar_conversas_existentes: (conversas: Record<string, any>) => void;
  cliente_atualizou_conexao: (dados: { contato: string; novoId: string }) => void;
  
  nova_mensagem_cliente: (dados: { 
    idDoCliente: string; 
    autor: string; 
    contato: string; 
    texto: string; 
    hora: string; 
    status?: 'enviado' | 'entregue' | 'lido';
  }) => void;

  status_admin: (status: boolean) => void;
  status_cliente: (dados: { contato: string; online: boolean }) => void;
  mensagens_visualizadas: () => void;
  
  status_mensagem_atualizado: (dados: { 
    contato: string; 
    status: 'entregue' | 'lido' 
  }) => void; 

  mensagem_enviada_sucesso: (dados: { contato?: string; id: string; texto: string; hora: string }) => void;
  mensagem_apagada: (dados: { contato?: string; idMensagem: string }) => void;
  conversa_removida: (dados: { contato: string }) => void;
  restaurar_conversa: (conversa: any) => void;

}

export interface ClientToServerEvents {
  entrar_como_admin: () => void;
  cliente_reconectado: (dados: { contato: string; nome: string }) => void;
  enviar_mensagem: (dados: ISocketMessage) => void;
  solicitar_status_admin: () => void;
  marcar_como_lido: (dados: { contato: string }) => void;
  atualizar_status_mensagem: (dados: { 
    contato: string; 
    roleTarget: 'user' | 'admin'; 
    status: 'entregue' | 'lido' 
  }) => void; 
  apagar_mensagem: (dados: { idMensagem: string; contato: string }) => void;
  remover_conversa: (dados: { contato: string }) => void;
}