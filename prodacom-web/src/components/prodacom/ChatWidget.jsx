import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Maximize2, Minimize2, Send, ChevronRight, Check, CheckCheck, Trash2, ChevronDown, Ban } from "lucide-react";
import { WebChatContext } from "../../context/WebChatContext"; 

const quickReplies = ["Solicitar orçamento", "Relógio de ponto", "Controle de acesso", "Falar com um consultor"];

function StatusMensagem({ status }) {
  if (status === "enviado") return <Check size={13} className="text-white/70" />;
  if (status === "entregue") return <CheckCheck size={14} className="text-white/70" />;
  if (status === "lido") return <CheckCheck size={14} className="text-sky-300" />;
  return <Check size={13} className="text-white/70" />;
}

export default function ChatWidget() {
  const [isOverContact, setIsOverContact] = useState(false);
  const [menuMsgId, setMenuMsgId] = useState(null); 
  const location = useLocation();

  const {
    open, setOpen, expanded, setExpanded, input, setInput, messages,
    isAskingContact, isIdentified, leadForm, setLeadForm, messagesEndRef,
    isAdminOnline, unreadCount, handleFirstMessage, handleStartChat, handleSend, handleApagarMensagemCliente
  } = useContext(WebChatContext);

  useEffect(function () {
    let observer = null;
    let attempts = 0;
    const maxAttempts = 10; 
    function initObserver() {
      const contatoSection = document.getElementById("contato");
      if (contatoSection) {
        if (observer) observer.disconnect();
        observer = new IntersectionObserver((entries) => { if (entries[0]) setIsOverContact(entries[0].isIntersecting); }, { threshold: 0.15 });
        observer.observe(contatoSection);
      } else if (attempts < maxAttempts) {
        attempts++; setTimeout(initObserver, 200);
      } else { setIsOverContact(false); }
    }
    initObserver();
    return () => { if (observer) observer.disconnect(); };
  }, [location.pathname]);

  useEffect(() => {
    if (open && expanded && window.innerWidth < 768) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open, expanded]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3" onClick={() => setMenuMsgId(null)}>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} 
            className={`bg-white flex flex-col shadow-2xl overflow-hidden transition-all duration-300
              ${expanded ? "fixed inset-0 z-[70] w-full h-[100dvh] rounded-none md:relative md:inset-auto md:w-[520px] lg:w-[640px] md:h-[640px] md:border md:border-slate_mist md:rounded-xl" 
                         : "relative w-[calc(100vw-2.5rem)] sm:w-[360px] h-[calc(100dvh-7rem)] sm:h-[480px] sm:max-h-[80vh] border border-slate_mist rounded-xl"}
            `}
          >
            
            <div className="bg-obsidian text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-cobalt flex items-center justify-center"><MessageSquare size={16} strokeWidth={1.5} /></div>
                <div>
                  <p className="font-display font-bold text-sm tracking-widest uppercase">Prodacom</p>
                  <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isAdminOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} /> 
                    {isAdminOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setExpanded(!expanded)} className="p-2 hover:bg-white/10">{expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10"><X size={16} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ghost custom-scrollbar">
              {messages.map(function (msg, i) {
                const isUser = msg.role === "user";
                const msgIdentifier = msg.id || `temp-${i}`;
                const isApagada = Boolean(msg.apagada) || msg.content === "Mensagem apagada";

                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex relative ${isUser ? "justify-end" : "justify-start"}`}>
                    {!isUser && (
                      <div className="w-7 h-7 bg-obsidian text-white flex items-center justify-center mr-2 mt-1 shadow-md shrink-0"><MessageSquare size={12} /></div>
                    )}
                    
                    <div className="flex flex-col gap-1 max-w-[85%] md:max-w-[78%] relative">
                      
                      <div className="relative flex items-center gap-1 group">
                        
                        {isUser && !isApagada && msg.id && (
                          <div className={`relative transition-opacity z-10 ${menuMsgId === msgIdentifier ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMenuMsgId(menuMsgId === msgIdentifier ? null : msgIdentifier); }} 
                              className={`p-1.5 rounded-full transition-colors ${menuMsgId === msgIdentifier ? "bg-slate-200 text-cobalt" : "text-slate-400 hover:text-cobalt hover:bg-slate-200"}`}
                            >
                              <ChevronDown size={14} className={`transition-transform duration-200 ${menuMsgId === msgIdentifier ? "rotate-180" : ""}`}/>
                            </button>

                            {menuMsgId === msgIdentifier && (
                              <div className="absolute right-0 top-full mt-1 w-28 bg-white border border-slate_mist shadow-xl rounded-md z-[70] py-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApagarMensagemCliente(msg.id);
                                    setMenuMsgId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-xs font-medium text-rose-500 hover:bg-rose-50 flex items-center gap-2"
                                >
                                  <Trash2 size={12} /> Excluir
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm flex items-center gap-2 rounded-lg ${
                          isApagada 
                            ? "italic text-slate-400 bg-slate-100 border border-slate-300" 
                            : isUser 
                              ? "bg-cobalt text-white" 
                              : "bg-white border border-slate_mist text-obsidian"
                        }`}>
                          {isApagada && <Ban size={14} className="text-slate-400 shrink-0" />}
                          {isApagada ? "Mensagem apagada" : msg.content}
                        </div>
                      </div>

                      <div className={`flex items-center gap-1.5 ${isUser ? "justify-end" : "justify-start"}`}>
                        <span className="text-[9px] font-mono uppercase text-slate-400">{msg.hora || "--:--"}</span>
                        {isUser && <StatusMensagem status={msg.status || "enviado"} />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && !isAskingContact && (
              <div className="px-5 py-3 border-t border-slate_mist bg-white flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button key={q} onClick={() => { handleFirstMessage(q); setInput(""); }} className="text-xs text-obsidian/70 border border-slate_mist px-3 py-1.5 hover:bg-cobalt hover:text-white flex items-center gap-1">
                    {q} <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            )}

            {isAskingContact ? (
              <form onSubmit={handleStartChat} className="p-4 border-t border-slate_mist bg-white flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
                <p className="text-xs text-obsidian/60 font-medium">Por favor, informe os seus dados para iniciarmos:</p>
                <div className="flex gap-2">
                  <input type="text" required placeholder="Seu nome" value={leadForm.nome} onChange={(e) => setLeadForm({ ...leadForm, nome: e.target.value })} className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" />
                  <input type="text" required placeholder="WhatsApp" maxLength={15} value={leadForm.contato} onChange={(e) => setLeadForm({ ...leadForm, contato: e.target.value })} className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" />
                </div>
                <button type="submit" className="w-full bg-cobalt text-white py-2 text-sm font-medium tracking-wider uppercase hover:bg-obsidian transition-colors">Iniciar Atendimento</button>
              </form>
            ) : (
              <form onSubmit={handleSend} className="p-3 border-t border-slate_mist bg-white flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escreva a sua mensagem..." className="flex-1 bg-ghost border border-slate_mist px-4 py-2.5 text-sm focus:outline-none focus:border-cobalt" />
                <button type="submit" className="bg-cobalt text-white p-2.5 hover:bg-obsidian"><Send size={16} /></button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)} 
        className={`relative w-14 h-14 flex items-center justify-center shadow-2xl transition-colors duration-200 ${isOverContact ? "bg-cobalt text-white border border-white/20" : "bg-obsidian text-white"}`}
      >
        {unreadCount > 0 && !open && <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-md">{unreadCount}</span>}
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>
    </div>
  );
}