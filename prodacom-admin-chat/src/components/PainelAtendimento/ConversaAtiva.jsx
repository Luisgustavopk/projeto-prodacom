import React, { useRef, useEffect, useState } from "react";
import { MessageSquare, Send, User, Phone, ChevronLeft, Check, CheckCheck, Trash2, ChevronDown, Ban } from "lucide-react";
import { socket } from "../../services/socket";

function StatusMensagem({ status }) {
  if (status === "enviado") return <Check size={13} className="text-slate-400" />;
  if (status === "entregue") return <CheckCheck size={14} className="text-slate-400" />;
  if (status === "lido") return <CheckCheck size={14} className="text-blue-500" />;
  return <Check size={13} className="text-slate-400" />;
}

export function ConversaAtiva({ clienteAtivo, setClienteAtivo, chat, input, setInput, handleSend }) {
  const messagesEndRef = useRef(null);
  const [menuMsgId, setMenuMsgId] = useState(null); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.mensagens]);

  if (!clienteAtivo || !chat) {
    return (
      <div className="hidden md:flex flex-1 flex-col items-center justify-center text-slate-300 bg-slate-50">
        <div className="w-24 h-24 border-2 border-dashed border-slate-200 flex items-center justify-center mb-6"><MessageSquare size={40} strokeWidth={1} /></div>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-center px-4">Selecione um cliente</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-slate-50 z-10 w-full relative" onClick={() => setMenuMsgId(null)}>
      <div className="px-4 md:px-8 py-4 md:py-5 bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={() => setClienteAtivo(null)} className="md:hidden flex items-center justify-center w-10 h-10 bg-white/5 text-white hover:bg-white/10"><ChevronLeft size={20} /></button>
          <div className="flex w-10 h-10 md:w-12 md:h-12 bg-[#2563eb] text-white items-center justify-center shadow-lg"><User size={20} strokeWidth={1.5} /></div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.15em] line-clamp-1">{chat.nome}</h2>
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${chat.online ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
            </div>
            <div className="flex items-center gap-2 md:gap-4 mt-0.5 md:mt-1">
              <a href={`https://wa.me/${chat.contato?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-sky-700 hover:text-white transition-colors text-[9px] md:text-[10px] font-mono font-bold flex items-center gap-1"><Phone size={10} /> {chat.contato}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-slate-50 custom-scrollbar">
        {chat.mensagens?.map((msg, i) => {
          const isAdmin = msg.role === "admin" || msg.autor === "Admin";
          const msgIdentifier = msg.id || `temp-${i}`;
          const isApagada = Boolean(msg.apagada) || msg.content === "Mensagem apagada" || msg.texto === "Mensagem apagada";

          return (
            <div key={i} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
              {!isAdmin && (
                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1a1a1a] text-white flex items-center justify-center mr-2 md:mr-3 mt-1 shadow-md shrink-0">
                  <MessageSquare size={12} className="md:w-3.5 md:h-3.5" />
                </div>
              )}
              
              <div className="flex flex-col gap-1 max-w-[85%] md:max-w-[78%] relative">
                
                <div className="relative flex items-center gap-2 group">

                  {isAdmin && !isApagada && (
                    <div className={`absolute top-1/2 -translate-y-1/2 -left-8 transition-opacity z-10 ${menuMsgId === msgIdentifier ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMenuMsgId(menuMsgId === msgIdentifier ? null : msgIdentifier); }}
                        className={`p-1 rounded-full transition-colors ${menuMsgId === msgIdentifier ? "bg-slate-200 text-[#2563eb]" : "text-slate-400 hover:text-[#2563eb] hover:bg-slate-200"}`}
                      >
                        <ChevronDown size={14} className={`transition-transform duration-200 ${menuMsgId === msgIdentifier ? "rotate-180" : ""}`} />
                      </button>

                      {menuMsgId === msgIdentifier && msg.id && (
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-32 bg-white border border-slate-200 shadow-xl rounded-md z-[70] py-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              socket.emit("apagar_mensagem", { idMensagem: msg.id, contato: chat.contato });
                              setMenuMsgId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <Trash2 size={12} /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm leading-relaxed shadow-sm flex items-center gap-2 rounded-lg ${
                    isApagada 
                      ? "italic text-slate-400 bg-slate-100 border border-slate-200" 
                      : isAdmin 
                        ? "bg-[#2563eb] text-white border border-[#2563eb]" 
                        : "bg-white border border-slate-200 text-[#1a1a1a]"
                  }`}>
                    {isApagada && <Ban size={14} className="text-slate-400 shrink-0" />}
                    {isApagada ? "Mensagem apagada" : (msg.content || msg.texto)}
                  </div>

                </div>

                <div className={`flex items-center gap-1.5 ${isAdmin ? "justify-end" : "justify-start"}`}>
                  <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-tighter text-slate-400">{msg.hora}</span>
                  {isAdmin && <StatusMensagem status={msg.status || "enviado"} />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 md:p-6 bg-white border-t border-slate-200 shrink-0" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSend} className="flex items-center gap-2 md:gap-3 max-w-5xl mx-auto">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="RESPONDER..." className="flex-1 bg-slate-50 border border-slate-200 px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-medium text-[#1a1a1a] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] transition-all uppercase tracking-widest" />
          <button type="submit" className="bg-[#2563eb] text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:bg-[#1a1a1a] transition-all shadow-xl active:scale-95 shrink-0"><Send size={18} className="md:w-5 md:h-5" /></button>
        </form>
      </div>
    </div>
  );
}