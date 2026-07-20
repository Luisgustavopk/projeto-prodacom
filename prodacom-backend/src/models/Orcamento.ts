import { Schema, model } from "mongoose";

interface IOrcamento {
  nome: string;   
  empresa?: string;
  email: string;
  telefone?: string;
  segmento?: string;
  mensagem: string;
  createdAt: Date;
}

const OrcamentoSchema = new Schema<IOrcamento>({
  nome: { type: String, required: true },
  empresa: { type: String, required: false },
  email: { type: String, required: true, index: true },
  telefone: { type: String, required: false },
  segmento: { type: String, required: false },
  mensagem: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

export const OrcamentoModel = model<IOrcamento>("Orcamento", OrcamentoSchema);