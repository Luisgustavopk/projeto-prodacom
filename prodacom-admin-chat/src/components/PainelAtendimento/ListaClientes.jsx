import React, { useState } from "react";
import { Monitor, ChevronDown, Trash2 } from "lucide-react";
import { socket } from "../../services/socket"; // 👈 Importamos o socket para poder emitir o evento daqui

function formatarTempoVisivel(isoString, fallbackHora) {
  if (!isoString) return fallbackHora || "--:--";
  const msgDate = new Date(isoString);
  const now = new Date();
  const isHoje = msgDate.getDate() === now.getDate() && msgDate.getMonth() === now.getMonth() && msgDate.getFullYear() === now.getFullYear();
  if (isHoje) return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return msgDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function ListaClientes({ chats, clienteAtivo, setClienteAtivo }) {
  // 👈 Estado para controlar qual menu de contato está aberto
  const [menuAbertoId, setMenuAbertoId] = useState(null);

  const conversasOrdenadas = Object.entries(chats).sort((a, b) => {
    const dataA = a[1].lastMessageAt ? new Date(a[1].lastMessageAt).getTime() : 0;
    const dataB = b[1].lastMessageAt ? new Date(b[1].lastMessageAt).getTime() : 0;
    return dataB - dataA;
  });

  return (
    <div className={`${clienteAtivo ? "hidden md:flex" : "flex"} w-full md:w-1/3 md:max-w-sm bg-[#1a1a1a] flex-col border-r border-white/5 shadow-2xl z-20`}>
      <div className="p-4 md:p-6 bg-[#1a1a1a] border-b border-white/5 flex items-center gap-3 md:gap-4 shrink-0">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-cobalt flex items-center justify-center shadow-lg">
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

            return (
              <div 
                key={id}
                onMouseLeave={() => setMenuAbertoId(null)} // Fecha o menu se o mouse sair da área do contato
                className="relative"
              >
                <button
                  onClick={() => setClienteAtivo(id)}
                  className={`w-full text-left p-4 md:p-5 border-b border-white/5 transition-all flex flex-col gap-2 group ${isSelected ? "bg-sky-800" : "hover:bg-white/5"}`}
                >
                  <div className="flex justify-between items-start w-full pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full transition-all duration-300 ${dados.online ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                      <span className={`font-bold text-xs uppercase tracking-wider ${isSelected ? "text-white" : "text-white/90"}`}>{dados.nome}</span>
                      {dados.unread && !isSelected && <span className="ml-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />}
                    </div>
                    <span className={`text-[9px] font-mono ${isSelected ? "text-white/60" : "text-white/30"}`}>
                      {formatarTempoVisivel(dados.lastMessageAt, ultimaMsg?.hora)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] md:text-[11px] truncate pr-4 ${dados.unread ? "font-bold text-white" : isSelected ? "text-white/80" : "text-white/40"}`}>
                      {ultimaMsg ? (ultimaMsg.apagada ? "Mensagem apagada" : ultimaMsg.content) : "Nova solicitação"}
                    </span>
                    
                    {/* 👇 ÁREA DA SETINHA COM ANIMAÇÃO E MENU */}
                    <div className="relative shrink-0 flex items-center">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que clicar na seta selecione o chat
                          setMenuAbertoId(menuAbertoId === id ? null : id);
                        }}
                        className={`p-1.5 rounded-full transition-colors ${isSelected ? "text-white hover:bg-black/20" : "text-white/20 group-hover:text-white/70 group-hover:bg-white/10"}`}
                      >
                        {/* Animação: Começa em -90deg (apontando pro lado). No hover ou se aberto, gira pra 0deg (baixo) */}
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 ${menuAbertoId === id ? "rotate-0" : "-rotate-90 group-hover:rotate-0"}`} 
                        />
                      </div>

                      {/* Dropdown Encerrar/Excluir */}
                      {menuAbertoId === id && (
                        <div 
                          className="absolute right-0 top-full mt-1 w-32 bg-[#2a2a2a] border border-white/10 shadow-2xl rounded-md z-[60] py-1 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              socket.emit("remover_conversa", { contato: dados.contato });
                              setMenuAbertoId(null);
                              if (clienteAtivo === id) setClienteAtivo(null);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-rose-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={12} /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                    {/* FIM DA ÁREA DA SETINHA */}

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