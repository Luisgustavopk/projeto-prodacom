import React from "react";
import { usePainelSocket } from "./usePainelSocket";
import { ListaClientes } from "./ListaClientes"; 
import { ConversaAtiva } from "./ConversaAtiva";

export function PainelDeAtendimento() {
  const { chats, clienteAtivo, setClienteAtivo, input, setInput, handleSend, mudarStatusAtendimento } = usePainelSocket();

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans selection:bg-[#2563eb] selection:text-white overflow-hidden">
      
      <ListaClientes 
        chats={chats} 
        clienteAtivo={clienteAtivo} 
        setClienteAtivo={setClienteAtivo} 
      />

      <ConversaAtiva 
        clienteAtivo={clienteAtivo} 
        setClienteAtivo={setClienteAtivo} 
        chat={chats[clienteAtivo]} 
        input={input} 
        setInput={setInput} 
        handleSend={handleSend} 
        mudarStatusAtendimento={mudarStatusAtendimento} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; }
      `}} />
    </div>
  );
}