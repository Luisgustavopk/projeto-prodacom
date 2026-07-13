// src/components/PainelDeAtendimento.jsx
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User, Phone, Monitor, ChevronRight, ChevronLeft } from "lucide-react";
import { socket } from "../services/socket"; // Corrigido o caminho relativo para a pasta services

export function PainelDeAtendimento() {
  const [chats, setChats] = useState({});
  const [clienteAtivo, setClienteAtivo] = useState(null);
  const [input, setInput] = useState("");
  
  const messagesEndRef = useRef(null);

  useEffect(function () {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, clienteAtivo]);

  useEffect(function () {
    socket.connect();
    socket.emit("entrar_como_admin");

    socket.on("sincronizar_conversas_existentes", function (historicoDoServidor) {
      setChats(historicoDoServidor);
    });

    function handleNovaMensagem(dados) {
      setChats(function (prevChats) {
        const chatId = dados.contato;
        const chatAtual = prevChats[chatId] || {
          nome: dados.autor,
          contato: dados.contato,
          idDoCliente: dados.contato,
          mensagens: []
        };

        return {
          ...prevChats,
          [chatId]: {
            ...chatAtual,
            mensagens: [...chatAtual.mensagens, { role: "user", content: dados.texto, hora: dados.hora }]
          }
        };
      });
    }

    socket.on("nova_mensagem_cliente", handleNovaMensagem);

    return function () {
      socket.off("sincronizar_conversas_existentes");
      socket.off("nova_mensagem_cliente", handleNovaMensagem);
      socket.disconnect(); 
    };
  }, []);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !clienteAtivo) return;

    const texto = input.trim();
    const hora = new Date().toLocaleTimeString();

    socket.emit("enviar_mensagem", {
      autor: "Admin",
      texto: texto,
      hora: hora,
      salaDestino: clienteAtivo 
    });

    setChats(function (prev) {
      return {
        ...prev,
        [clienteAtivo]: {
          ...prev[clienteAtivo],
          mensagens: [...prev[clienteAtivo].mensagens, { role: "admin", content: texto, hora: hora }]
        }
      };
    });

    setInput("");
  }

  const conversasAtivas = Object.entries(chats);

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* BARRA LATERAL */}
      <div className={`${clienteAtivo ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 md:max-w-sm bg-[#1a1a1a] flex-col border-r border-white/5 shadow-2xl z-20`}>
        <div className="p-4 md:p-6 bg-[#1a1a1a] border-b border-white/5 flex items-center gap-3 md:gap-4 shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2563eb] flex items-center justify-center shadow-lg">
            <Monitor className="text-white" size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Painel de Atendimento</h1>
            <p className="text-emerald-400 text-[9px] md:text-[10px] font-mono flex items-center gap-2 mt-1 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" /> Sistema Online
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversasAtivas.length === 0 ? (
            <div className="text-white/20 text-center text-[10px] uppercase tracking-widest p-10 mt-10 font-medium">
              Aguardando novas conexões...
            </div>
          ) : (
            conversasAtivas.map(function ([id, dados]) {
              return (
                <button
                  key={id}
                  onClick={function () { setClienteAtivo(id); }}
                  className={`w-full text-left p-4 md:p-5 border-b border-white/5 transition-all flex flex-col gap-2 group ${
                    clienteAtivo === id ? "bg-[#2563eb]" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className={`font-bold text-xs uppercase tracking-wider ${clienteAtivo === id ? "text-white" : "text-white/90"}`}>
                      {dados.nome}
                    </span>
                    <span className={`text-[9px] font-mono ${clienteAtivo === id ? "text-white/60" : "text-white/30"}`}>
                      {dados.mensagens?.length > 0 ? dados.mensagens[dados.mensagens.length - 1].hora : "--:--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] md:text-[11px] truncate pr-4 ${clienteAtivo === id ? "text-white/80" : "text-white/40"}`}>
                      {dados.mensagens?.length > 0 ? dados.mensagens[dados.mensagens.length - 1].content : "Nova solicitação"}
                    </span>
                    <ChevronRight size={12} className={clienteAtivo === id ? "text-white" : "text-white/10"} />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ÁREA PRINCIPAL DO CHAT */}
      <div className={`${!clienteAtivo ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-slate-50 z-10 w-full`}>
        {clienteAtivo && chats[clienteAtivo] ? (
          <>
            {/* Header do Chat Ativo */}
            <div className="px-4 md:px-8 py-4 md:py-5 bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3 md:gap-4">
                <button 
                  onClick={function () { setClienteAtivo(null); }}
                  className="md:hidden flex items-center justify-center w-10 h-10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex w-10 h-10 md:w-12 md:h-12 bg-[#2563eb] text-white items-center justify-center shadow-lg">
                  <User size={20} strokeWidth={1.5} />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.15em] line-clamp-1">
                      {chats[clienteAtivo].nome}
                    </h2>
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 mt-0.5 md:mt-1">
                    <a href={`https://wa.me/${chats[clienteAtivo].contato.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-[#2563eb] hover:text-white transition-colors text-[9px] md:text-[10px] font-mono font-bold flex items-center gap-1">
                      <Phone size={10} /> {chats[clienteAtivo].contato}
                    </a>
                    <span className="hidden sm:inline text-white/30 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">
                      ID: {clienteAtivo.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-slate-50 custom-scrollbar">
              {chats[clienteAtivo].mensagens?.map(function (msg, i) {
                return (
                  <div key={i} className={`flex ${msg.role === "admin" ? "justify-end" : "justify-start"}`}>
                    {msg.role !== "admin" && (
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1a1a1a] text-white flex items-center justify-center mr-2 md:mr-3 mt-1 shadow-md shrink-0">
                        <MessageSquare size={12} className="md:w-3.5 md:h-3.5" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[85%] md:max-w-[65%]">
                      <div
                        className={`px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm leading-relaxed shadow-sm ${
                          msg.role === "admin"
                            ? "bg-[#2563eb] text-white border border-[#2563eb]"
                            : "bg-white border border-slate-200 text-[#1a1a1a]"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-tighter text-slate-400">
                        {msg.hora}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Mensagem */}
            <div className="p-3 md:p-6 bg-white border-t border-slate-200 shrink-0">
              <form onSubmit={handleSend} className="flex items-center gap-2 md:gap-3 max-w-5xl mx-auto">
                <input
                  type="text"
                  value={input}
                  onChange={function (e) { setInput(e.target.value); }}
                  placeholder="RESPONDER..."
                  className="flex-1 bg-slate-50 border border-slate-200 px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-medium text-[#1a1a1a] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] transition-all uppercase tracking-widest"
                />
                <button type="submit" className="bg-[#2563eb] text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:bg-[#1a1a1a] transition-all shadow-xl active:scale-95 shrink-0">
                  <Send size={18} className="md:w-5 md:h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="hidden md:flex flex-1 flex-col items-center justify-center text-slate-300">
            <div className="w-24 h-24 border-2 border-dashed border-slate-200 flex items-center justify-center mb-6">
              <MessageSquare size={40} strokeWidth={1} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-center px-4">Selecione um cliente para atendimento</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; }
      `}} />
    </div>
  );
}