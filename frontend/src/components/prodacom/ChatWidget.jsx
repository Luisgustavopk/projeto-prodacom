import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Maximize2, Minimize2, Send, Phone, Mail, ChevronRight } from "lucide-react";
import { io } from "socket.io-client";

const quickReplies = ["Solicitar orçamento", "Relógio de ponto", "Controle de acesso", "Falar com um consultor"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! Bem-vindo à Prodacom. Como podemos ajudar com a sua infraestrutura de ponto e acesso hoje?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);


  const [isIdentified, setIsIdentified] = useState(false); 
  const [isAskingContact, setIsAskingContact] = useState(false); 
  const [pendingMessage, setPendingMessage] = useState(""); 
  const [leadForm, setLeadForm] = useState({ nome: "", contato: "" }); 


  const socketRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, isAskingContact]);


  const handleFirstMessage = (texto) => {
  
    setMessages((prev) => [...prev, { role: "user", content: texto }]);
    setPendingMessage(texto);
    setIsAskingContact(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Antes de responder sua pergunta, para dar continuidade a este atendimento, por favor insira seus dados abaixo" 
      }]);
    }, 600);
  };


  const handleStartChat = (e) => {
    e.preventDefault();
    if (!leadForm.nome || !leadForm.contato) return;


    socketRef.current = io("http://localhost:3001");

 
    socketRef.current.emit("enviar_mensagem", {
      autor: leadForm.nome,
      contato: leadForm.contato,
      texto: pendingMessage,
      hora: new Date().toLocaleTimeString()
    });

   
    socketRef.current.on("receber_mensagem", (dados) => {
      if (dados.autor !== leadForm.nome) {
        setMessages((prev) => [...prev, { role: "assistant", content: dados.texto }]);
      }
    });

   
    setIsAskingContact(false);
    setIsIdentified(true);
  };


  const handleSendNormal = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const texto = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: texto }]);
    setInput("");

 
    if (socketRef.current) {
      socketRef.current.emit("enviar_mensagem", {
        autor: leadForm.nome,
        texto: texto,
        hora: new Date().toLocaleTimeString()
      });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!isIdentified && !isAskingContact) {
      handleFirstMessage(input.trim());
      setInput("");
    } else {
      handleSendNormal(e);
    }
  };

  const panelWidth = expanded ? "md:w-[520px] lg:w-[640px]" : "w-[360px]";
  const panelHeight = expanded ? "h-[600px] md:h-[640px]" : "h-[480px]";

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} className={`${panelWidth} ${panelHeight} bg-white border border-slate_mist flex flex-col shadow-2xl`}>
            {/* Header */}
            <div className="bg-obsidian text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-cobalt flex items-center justify-center">
                  <MessageSquare size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm tracking-widest uppercase">Prodacom</p>
                  <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setExpanded(!expanded)} className="p-2 hover:bg-white/10">
                  {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ghost">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 bg-obsidian text-white flex items-center justify-center mr-2 mt-1"><MessageSquare size={12} /></div>
                  )}
                  <div className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-cobalt text-white" : "bg-white border border-slate_mist text-obsidian"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Sugestões Rápidas (some após a primeira mensagem) */}
            {messages.length === 1 && !isAskingContact && (
              <div className="px-5 py-3 border-t border-slate_mist bg-white flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button key={q} onClick={() => { handleFirstMessage(q); setInput(""); }} className="text-xs text-obsidian/70 border border-slate_mist px-3 py-1.5 hover:bg-cobalt hover:text-white flex items-center gap-1">
                    {q} <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            )}

            {/* BARRA DE DIGITAÇÃO OU FORMULÁRIO DE CAPTURA */}
            {isAskingContact ? (
              <form onSubmit={handleStartChat} className="p-4 border-t border-slate_mist bg-white flex flex-col gap-3">
                <p className="text-xs text-obsidian/60 font-medium">Por favor, informe seus dados para iniciarmos:</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    required 
                    placeholder="Seu nome" 
                    value={leadForm.nome} 
                    onChange={(e) => setLeadForm({...leadForm, nome: e.target.value})} 
                  
                    className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" 
                  />
                  <input 
                    type="text" 
                    required 
                    placeholder="WhatsApp" 
                    maxLength={15} 
                    value={leadForm.contato} 
                    onChange={(e) => setLeadForm({...leadForm, contato: e.target.value})} 
                    className="flex-1 min-w-0 w-full bg-ghost border border-slate_mist px-3 py-2 text-sm focus:outline-none focus:border-cobalt" 
                  />
                </div>
                <button type="submit" className="w-full bg-cobalt text-white py-2 text-sm font-medium tracking-wider uppercase hover:bg-obsidian transition-colors">
                  Iniciar Atendimento
                </button>
              </form>
            ) :  (
              <form onSubmit={handleSend} className="p-3 border-t border-slate_mist bg-white flex items-center gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escreva sua mensagem..." className="flex-1 bg-ghost border border-slate_mist px-4 py-2.5 text-sm focus:outline-none focus:border-cobalt" />
                <button type="submit" className="bg-cobalt text-white p-2.5 hover:bg-obsidian"><Send size={16} /></button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Flutuante */}
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)} className="bg-obsidian text-white w-14 h-14 flex items-center justify-center shadow-2xl">
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>
    </div>
  );
}