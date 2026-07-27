import React from "react";
import { Monitor, ChevronRight } from "lucide-react";

// Função para formatar o tempo (Verifica se passou de 24h)
function formatarTempoVisivel(isoString, fallbackHora) {
  if (!isoString) return fallbackHora || "--:--";
  
  const msgDate = new Date(isoString);
  const now = new Date();
  
  // Verifica se é o mesmo dia (para mostrar só a hora)
  const isHoje = msgDate.getDate() === now.getDate() && 
                 msgDate.getMonth() === now.getMonth() && 
                 msgDate.getFullYear() === now.getFullYear();

  if (isHoje) {
    return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // Se não for hoje, mostra a data (Ex: 25/07/2026)
    return msgDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}

export function ListaClientes({ chats, clienteAtivo, setClienteAtivo }) {
  
  // ORDENAÇÃO: Pega as conversas e ordena da mais recente para a mais antiga
  const conversasOrdenadas = Object.entries(chats).sort((a, b) => {
    const dataA = a[1].lastMessageAt ? new Date(a[1].lastMessageAt).getTime() : 0;
    const dataB = b[1].lastMessageAt ? new Date(b[1].lastMessageAt).getTime() : 0;
    return dataB - dataA; // Retorna em ordem decrescente
  });

  return (
    <div className={`${clienteAtivo ? "hidden md:flex" : "flex"} w-full md:w-1/3 md:max-w-sm bg-[#1a1a1a] flex-col border-r border-white/5 shadow-2xl z-20`}>
      
      {/* Header Sidebar */}
      <div className="p-4 md:p-6 bg-[#1a1a1a] border-b border-white/5 flex items-center gap-3 md:gap-4 shrink-0">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-cobalt flex items-center justify-center shadow-lg">
          <Monitor className="text-white" size={18} strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
            Painel de Atendimento
          </h1>
          <p className="text-emerald-400 text-[9px] md:text-[10px] font-mono flex items-center gap-2 mt-1 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" /> Sistema Online
          </p>
        </div>
      </div>

      {/* Lista de Conversas Ordenadas */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversasOrdenadas.length === 0 ? (
          <div className="text-white/20 text-center text-[10px] uppercase tracking-widest p-10 mt-10 font-medium">
            Aguardando novas conexões...
          </div>
        ) : (
          conversasOrdenadas.map(([id, dados]) => {
            const isSelected = clienteAtivo === id;
            
            // Pega a última mensagem para exibir o textinho resumido e fallback de hora
            const ultimaMsg = dados.mensagens?.length > 0 
              ? dados.mensagens[dados.mensagens.length - 1] 
              : null;

            return (
              <button
                key={id}
                onClick={() => setClienteAtivo(id)}
                className={`relative w-full text-left p-4 md:p-5 border-b border-white/5 transition-all flex flex-col gap-2 group ${
                  isSelected ? "bg-sky-800" : "hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-start w-full pr-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full transition-all duration-300 ${dados.online ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                    <span className={`font-bold text-xs uppercase tracking-wider ${isSelected ? "text-white" : "text-white/90"}`}>
                      {dados.nome}
                    </span>
                    
                    {/* Badge Bolinha de Não Lido */}
                    {dados.unread && !isSelected && (
                      <span className="ml-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    )}
                  </div>
                  
                  {/* HORA OU DATA DA ÚLTIMA MENSAGEM */}
                  <span className={`text-[9px] font-mono ${isSelected ? "text-white/60" : "text-white/30"}`}>
                    {formatarTempoVisivel(dados.lastMessageAt, ultimaMsg?.hora)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] md:text-[11px] truncate pr-4 ${dados.unread ? "font-bold text-white" : isSelected ? "text-white/80" : "text-white/40"}`}>
                    {ultimaMsg ? ultimaMsg.content : "Nova solicitação"}
                  </span>
                  <ChevronRight size={12} className={isSelected ? "text-white" : "text-white/10"} />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}