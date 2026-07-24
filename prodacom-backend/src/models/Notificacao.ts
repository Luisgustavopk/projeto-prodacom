import { Schema, model, Document } from "mongoose";

export interface INotificacao extends Document {
  tipo: "NOVO_CLIENTE_CHAT" | "MENSAGEM_PENDENTE";
  titulo: string;
  mensagem: string;
  clienteContato: string;
  clienteNome?: string;
  lida: boolean;
  createdAt: Date;
}

const NotificacaoSchema = new Schema<INotificacao>(
  {
    tipo: { 
      type: String, 
      enum: ["NOVO_CLIENTE_CHAT", "MENSAGEM_PENDENTE"], 
      required: true 
    },
    titulo: { type: String, required: true },
    mensagem: { type: String, required: true },
    clienteContato: { type: String, required: true, index: true },
    clienteNome: { type: String, required: false },
    lida: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const NotificacaoModel = model<INotificacao>("Notificacao", NotificacaoSchema);