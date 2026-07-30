import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Maximize2, Minimize2, Send, ChevronRight, Check, CheckCheck, Trash2, ChevronDown, Ban } from "lucide-react";
import { WebChatContext } from "../../context/WebChatContext"; 
import { socket } from "../../services/socket"; 

const quickReplies = ["Solicitar orçamento", "Relógio de ponto", "Controle de acesso", "Falar com um consultor"];

function StatusMensagem({ status }) {
  if (status === "enviado") return <Check size={13} className="text-white/70" />;
  if (status === "entregue") return <CheckCheck size={14} className="text-white/70" />;
  if (status === "lido") return <CheckCheck size={14} className="text-sky-300" />;
  return <Check size={13} className="text-white/70" />;
}

export default function ChatWidget() {
  const [isOverContact, setIsOverContact] = useState(false);
  const [menuMsgId, setMenuMsgId] = useState(null); // 👈 Controle do dropdown do cliente
  const location = useLocation();

  const {
    open, setOpen, expanded, setExpanded, input, setInput, messages,
    isAskingContact, isIdentified, leadForm, setLeadForm, messagesEndRef,
    isAdminOnline, unreadCount, handleFirstMessage, handleStartChat, handleSend
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
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} 
            className={`bg-white flex flex-col shadow-2xl overflow-hidden transition-all duration-300
              ${expanded ? "fixed inset-0 z-[70] w-full h-[100dvh] rounded-none md:relative md:inset-auto md:w-[520px] lg:w-[640px] md:h-[640px] md:border md:border-slate_mist md:rounded-xl" 
                         : "relative w-[calc(100vw-2.5rem)] sm:w-[360px] h-[calc(100dvh-7rem)] sm:h-[480px] sm:max-h-[80vh] border border-slate_mist rounded-xl"}
            `}
          >
            
            {/* HEADER */}
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

            {/* MENSAGENS */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ghost">
              {messages.map(function (msg, i) {
                const isUser = msg.role === "user";
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex group relative ${isUser ? "justify-end" : "justify-start"}`}>
                    {!isUser && (
                      <div className="w-7 h-7 bg-obsidian text-white flex items-center justify-center mr-2 mt-1 shrink-0"><MessageSquare size={12} /></div>
                    )}
                    
                    <div 
                      onMouseLeave={() => setMenuMsgId(null)}
                      className="flex flex-col gap-1 max-w-[78%] relative"
                    >
                      <div className="relative flex items-center gap-2">
                        
                        {/* 👇 Dropdown Excluir (APENAS PARA O CLIENTE/USER) */}
                        {isUser && !msg.apagada && msg.id && (
                          <div className="absolute top-1/2 -translate-y-1/2 -left-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button 
                              onClick={() => setMenuMsgId(menuMsgId === msg.id ? null : msg.id)} 
                              className="p-1 text-slate-400 hover:text-cobalt hover:bg-white rounded-full transition-colors"
                            >
                              <ChevronDown size={14} />
                            </button>

                            {menuMsgId === msg.id && (
                              <div className="absolute right-full top-full mr-1 mt-1 w-28 bg-white border border-slate_mist shadow-xl rounded-md z-20 py-1 overflow-hidden">
                                <button 
                                  onClick={() => {
                                    socket.emit("apagar_mensagem", { idMensagem: msg.id, contato: leadForm.contato.replace(/\D/g, "") });
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

                        {/* Balão da Mensagem */}
                        <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm flex items-center gap-2 ${
                          msg.apagada 
                            ? "italic text-obsidian/40 bg-[#f8fafc] border border-slate_mist rounded-lg" 
                            : isUser 
                              ? "bg-cobalt text-white" 
                              : "bg-white border border-slate_mist text-obsidian"
                        }`}>
                          {msg.apagada && <Ban size={12} className="text-obsidian/40 shrink-0" />}
                          {msg.content?.replace("🚫 ", "")}
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

            {/* SUGESTÕES RÁPIDAS */}
            {messages.length === 1 && !isAskingContact && (
              <div className="px-5 py-3 border-t border-slate_mist bg-white flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button key={q} onClick={() => { handleFirstMessage(q); setInput(""); }} className="text-xs text-obsidian/70 border border-slate_mist px-3 py-1.5 hover:bg-cobalt hover:text-white flex items-center gap-1">
                    {q} <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            )}

            {/* FORMULÁRIOS */}
            {isAskingContact ? (
              <form onSubmit={handleStartChat} className="p-4 border-t border-slate_mist bg-white flex flex-col gap-3">
                <p className="text-xs text-obsidian/60 font-medium">Por favor, informe os seus dados para iniciarmos:</p>
                <div className="flex gap-2">
                  <input type="text" required placeholder="Seu nome" value={leadForm.nome} onChange={(e) => setLeadForm({ ...leadForm, nome: e.target.value })} className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" />
                  <input type="text" required placeholder="WhatsApp" maxLength={15} value={leadForm.contato} onChange={(e) => setLeadForm({ ...leadForm, contato: e.target.value })} className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" />
                </div>
                <button type="submit" className="w-full bg-cobalt text-white py-2 text-sm font-medium tracking-wider uppercase hover:bg-obsidian transition-colors">Iniciar Atendimento</button>
              </form>
            ) : (
              <form onSubmit={handleSend} className="p-3 border-t border-slate_mist bg-white flex items-center gap-2">
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