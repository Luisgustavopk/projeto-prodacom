// src/components/prodacom/ChatWidget.jsx
import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Maximize2, Minimize2, Send, ChevronRight } from "lucide-react";
import { WebChatContext } from "../../context/WebChatContext"; 
import { socket } from "../../services/socket";

const quickReplies = ["Solicitar orçamento", "Relógio de ponto", "Controle de acesso", "Falar com um consultor"];

export default function ChatWidget() {
  const [isOverContact, setIsOverContact] = useState(false);
  const location = useLocation();

  const {
    open, setOpen,
    expanded, setExpanded,
    input, setInput,
    messages,
    isAskingContact,
    isIdentified,
    leadForm, setLeadForm,
    messagesEndRef,
    isAdminOnline,
    handleFirstMessage,
    handleStartChat,
    handleSend
  } = useContext(WebChatContext);


  useEffect(function () {
    let observer = null;
    let attempts = 0;
    const maxAttempts = 10; 

    function initObserver() {
      const contatoSection = document.getElementById("contato");

      if (contatoSection) {
        if (observer) observer.disconnect();
        observer = new IntersectionObserver(
          function (entries) {
            if (entries[0]) {
              setIsOverContact(entries[0].isIntersecting);
            }
          },
          { threshold: 0.15 }
        );
        observer.observe(contatoSection);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(initObserver, 200);
      } else {
        setIsOverContact(false);
      }
    }

    initObserver();

    return function () {
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  const panelWidth = expanded 
    ? "w-[calc(100vw-2.5rem)] md:w-[520px] lg:w-[640px]" 
    : "w-[calc(100vw-2.5rem)] sm:w-[360px]";
    
  const panelHeight = expanded 
    ? "h-[calc(100dvh-7rem)] md:h-[640px]" 
    : "h-[calc(100dvh-7rem)] sm:h-[480px] sm:max-h-[80vh]";

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} className={`${panelWidth} ${panelHeight} bg-white border border-slate_mist flex flex-col shadow-2xl`}>
            
            {/* HEADER DO CHAT */}
            <div className="bg-obsidian text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-cobalt flex items-center justify-center">
                  <MessageSquare size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm tracking-widest uppercase">Prodacom</p>
                  
                  {/* RENDERIZAÇÃO CONDICIONAL DO STATUS ONLINE/OFFLINE */}
                  <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isAdminOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} /> 
                    {isAdminOnline ? 'Online' : 'Offline'}
                  </p>
                  
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={function () { setExpanded(!expanded); }} className="p-2 hover:bg-white/10">
                  {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={function () { setOpen(false); }} className="p-2 hover:bg-white/10">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* MENSAGENS */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ghost">
              {messages.map(function (msg, i) {
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" || msg.role === "admin" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 bg-obsidian text-white flex items-center justify-center mr-2 mt-1"><MessageSquare size={12} /></div>
                    )}
                    <div className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" || msg.role === "admin" ? "bg-cobalt text-white" : "bg-white border border-slate_mist text-obsidian"}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* SUGESTÕES RÁPIDAS */}
            {messages.length === 1 && !isAskingContact && (
              <div className="px-5 py-3 border-t border-slate_mist bg-white flex flex-wrap gap-2">
                {quickReplies.map(function (q) {
                  return (
                    <button key={q} onClick={function () { handleFirstMessage(q); setInput(""); }} className="text-xs text-obsidian/70 border border-slate_mist px-3 py-1.5 hover:bg-cobalt hover:text-white flex items-center gap-1">
                      {q} <ChevronRight size={12} />
                    </button>
                  );
                })}
              </div>
            )}

            {/* FORMULÁRIO OU BARRA DE DIGITAÇÃO */}
            {isAskingContact ? (
              <form onSubmit={handleStartChat} className="p-4 border-t border-slate_mist bg-white flex flex-col gap-3">
                <p className="text-xs text-obsidian/60 font-medium">Por favor, informe os seus dados para iniciarmos:</p>
                <div className="flex gap-2">
                  <input type="text" required placeholder="Seu nome" value={leadForm.nome} onChange={function (e) { setLeadForm({ ...leadForm, nome: e.target.value }); }} className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" />
                  <input type="text" required placeholder="WhatsApp" maxLength={15} value={leadForm.contato} onChange={function (e) { setLeadForm({ ...leadForm, contato: e.target.value }); }} className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" />
                </div>
                <button type="submit" className="w-full bg-cobalt text-white py-2 text-sm font-medium tracking-wider uppercase hover:bg-obsidian transition-colors">
                  Iniciar Atendimento
                </button>
              </form>
            ) : (
              <form onSubmit={handleSend} className="p-3 border-t border-slate_mist bg-white flex items-center gap-2">
                <input type="text" value={input} onChange={function (e) { setInput(e.target.value); }} placeholder="Escreva a sua mensagem..." className="flex-1 bg-ghost border border-slate_mist px-4 py-2.5 text-sm focus:outline-none focus:border-cobalt" />
                <button type="submit" className="bg-cobalt text-white p-2.5 hover:bg-obsidian"><Send size={16} /></button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÃO FLUTUANTE DO CHAT */}
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        onClick={function () { setOpen(!open); }} 
        className={`w-14 h-14 flex items-center justify-center shadow-2xl transition-colors duration-200 ${
          isOverContact 
            ? "bg-cobalt text-white border border-white/20" 
            : "bg-obsidian text-white"
        }`}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>
    </div>
  );
}