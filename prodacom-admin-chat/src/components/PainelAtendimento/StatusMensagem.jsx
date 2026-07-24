import React from "react";
import { Check, CheckCheck } from "lucide-react";

export function StatusMensagem({ status }) {
  // 1. Enviado (1 traço cinza)
  if (status === "enviado") {
    return <Check size={13} className="text-slate-400 font-bold" />;
  }

  // 2. Entregue (2 traços cinzas)
  if (status === "entregue") {
    return <CheckCheck size={14} className="text-slate-400 font-bold" />;
  }

  // 3. Lido (2 traços azuis brilhantes)
  if (status === "lido") {
    return <CheckCheck size={14} className="text-sky-400 font-bold" />;
  }

  return null;
}