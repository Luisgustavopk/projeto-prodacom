import React, { useState } from "react";
import { Monitor, ChevronDown, Trash2, Ban } from "lucide-react";
import { socket } from "../../services/socket";

function formatarTempoVisivel(isoString, fallbackHora) {
  if (!isoString) return fallbackHora || "--:--";
  const msgDate = new Date(isoString);
  const now = new Date();
  const isHoje = msgDate.getDate() === now.getDate() && msgDate.getMonth() === now.getMonth() && msgDate.getFullYear() === now.getFullYear();
  if (isHoje) return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return msgDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function BadgeStatus({ status }) {
  const baseClasses = "px-2 py-[3px] rounded-full text-[8px] font-bold tracking-widest uppercase border shrink-0";
  
  if (status === 'em_andamento') {
    return <span className={`${baseClasses} bg-blue-500/10 text-blue-400 border-blue-500/20`}>Em Atend.</span>;
  }
  if (status === 'finalizado') {
    return <span className={`${baseClasses} bg-emerald-500/10 text-emerald-400 border-emerald-500/20`}>Finalizado</span>;
  }
  return <span className={`${baseClasses} bg-amber-500/10 text-amber-500 border-amber-500/20`}>Aberto</span>;
}

export function ListaClientes({ chats, clienteAtivo, setClienteAtivo }) {
  const [menuAbertoId, setMenuAbertoId] = useState(null);

  const conversasOrdenadas = Object.entries(chats).sort((a, b) => {
    const dataA = a[1].lastMessageAt ? new Date(a[1].lastMessageAt).getTime() : 0;
    const dataB = b[1].lastMessageAt ? new Date(b[1].lastMessageAt).getTime() : 0;
    return dataB - dataA;
  });

  return (
    <div className={`${clienteAtivo ? "hidden md:flex" : "flex"} w-full md:w-1/3 md:max-w-sm bg-[#1a1a1a] flex-col border-r border-white/5 shadow-2xl z-20`} onClick={() => setMenuAbertoId(null)}>
      <div className="p-4 md:p-6 bg-[#1a1a1a] border-b border-white/5 flex items-center gap-3 md:gap-4 shrink-0">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-cobalt flex items-center justify-center shadow-lg rounded-md">
          <Monitor className="text-white" size={18} strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Painel de Atendimento</h1>
          <p className="text-emerald-400 text-[9px] md:text-[10px] font-mono flex items-center gap-2 mt-1 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" /> Sistema Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-16">
        {conversasOrdenadas.length === 0 ? (
          <div className="text-white/20 text-center text-[10px] uppercase tracking-widest p-10 mt-10 font-medium">Aguardando novas conexões...</div>
        ) : (
          conversasOrdenadas.map(([id, dados]) => {
            const isSelected = clienteAtivo === id;
            const ultimaMsg = dados.mensagens?.length > 0 ? dados.mensagens[dados.mensagens.length - 1] : null;
            const isApagada = Boolean(ultimaMsg?.apagada) || ultimaMsg?.content === "Mensagem apagada" || ultimaMsg?.content === "🚫 Mensagem apagada";

            return (
              <div key={id} className="relative group">
                <button
                  onClick={() => setClienteAtivo(id)}
                  className={`w-full text-left p-4 md:p-5 border-b border-white/5 transition-all flex flex-col gap-2.5 ${isSelected ? "bg-sky-800" : "hover:bg-white/5"}`}
                >
                  <div className="flex justify-between items-start w-full pr-2">
                    
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className={`w-2 h-2 shrink-0 rounded-full transition-all duration-300 ${dados.online ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                      <span className={`font-bold text-xs uppercase tracking-wider truncate ${isSelected ? "text-white" : "text-white/90"}`}>{dados.nome}</span>
                      
                      <BadgeStatus status={dados.statusAtendimento || 'aberto'} />

                      {dados.unread && !isSelected && <span className="ml-1 w-2 h-2 shrink-0 bg-red-500 rounded-full animate-ping" />}
                    </div>

                    <span className={`text-[9px] font-mono shrink-0 pl-2 ${isSelected ? "text-white/60" : "text-white/30"}`}>
                      {formatarTempoVisivel(dados.lastMessageAt, ultimaMsg?.hora)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full">
                    <div className={`flex items-center gap-1.5 text-[10px] md:text-[11px] truncate pr-4 ${dados.unread ? "font-bold text-white" : isSelected ? "text-white/80" : "text-white/40"} ${isApagada ? "italic text-slate-400" : ""}`}>
                      {isApagada && <Ban size={12} className="text-slate-400 shrink-0" />}
                      <span className="truncate">{ultimaMsg ? (isApagada ? "Mensagem apagada" : ultimaMsg.content) : "Nova solicitação"}</span>
                    </div>
                    
                    <div className="relative shrink-0 flex items-center pr-2">
                      <div 
                        onClick={(e) => { e.stopPropagation(); setMenuAbertoId(menuAbertoId === id ? null : id); }}
                        className={`p-1.5 rounded-full transition-colors ${isSelected ? "text-white hover:bg-black/20" : "text-white/20 group-hover:text-white/70 group-hover:bg-white/10"}`}
                      >
                        <ChevronDown size={14} className={`transition-transform duration-300 ${menuAbertoId === id ? "rotate-0" : "-rotate-90 group-hover:rotate-0"}`} />
                      </div>

                      {menuAbertoId === id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-[#2a2a2a] border border-white/10 shadow-2xl rounded-md z-[60] py-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              socket.emit("remover_conversa", { contato: dados.contato });
                              setMenuAbertoId(null);
                              if (clienteAtivo === id) setClienteAtivo(null);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-rose-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={14} /> Remover Chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}