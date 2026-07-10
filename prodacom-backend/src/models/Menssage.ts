import { Schema, model } from "mongoose";

// Interface para o TypeScript saber os tipos de dados
interface IMessage {
  clienteId: string;   // O contacto/WhatsApp serve como ID único do chat
  clienteNome: string;
  role: "user" | "admin";
  content: string;
  hora: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  clienteId: { type: String, required: true, index: true }, // Index ajuda na velocidade de busca
  clienteNome: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  content: { type: String, required: true },
  hora: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // Guarda a data real para ordenação futura
});

export const MessageModel = model<IMessage>("Message", MessageSchema);