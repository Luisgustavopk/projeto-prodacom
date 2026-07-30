import { Schema, model } from "mongoose";


interface IMessage {
  clienteId: string;   
  clienteNome: string;
  role: "user" | "admin";
  content: string;
  hora: string;
  status: 'enviado' | 'entregue' | 'lido';
  apagada?: boolean;   
  arquivada?: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  clienteId: { type: String, required: true, index: true },
  clienteNome: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  content: { type: String, required: true },
  hora: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

export const MessageModel = model<IMessage>("Message", MessageSchema);