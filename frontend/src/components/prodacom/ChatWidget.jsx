import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Maximize2, Minimize2, Send, Phone, Mail, ChevronRight } from "lucide-react";

const quickReplies = [
  "Solicitar orçamento",
  "Relógio de ponto",
  "Controle de acesso",
  "Falar com um consultor",
];

const mockConversation = [
  {
    role: "assistant",
    content: "Olá! Bem-vindo à Prodacom. Como podemos ajudar com a sua infraestrutura de ponto e acesso hoje?",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState(mockConversation);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Faz a rolagem automática sempre que uma nova mensagem chegar
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, typing]);

  // Função simulada (mock) para respostas rápidas
  const sendQuickReply = (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    
    // Simula o atendente digitando
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Perfeito! Nossa equipe especializada pode te ajudar com isso. Por favor, aguarde um momento que um consultor já vai falar com você.",
        },
      ]);
    }, 1400);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendQuickReply(input.trim());
  };

  // Controles de expansão da janela
  const panelWidth = expanded ? "md:w-[520px] lg:w-[640px]" : "w-[360px]";
  const panelHeight = expanded ? "h-[600px] md:h-[640px]" : "h-[480px]";

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`${panelWidth} ${panelHeight} max-w-[calc(100vw-2.5rem)] h-[70vh] md:h-auto bg-white border border-slate_mist flex flex-col shadow-2xl`}
          >
            {/* Header do Chat */}
            <div className="bg-obsidian text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-cobalt flex items-center justify-center">
                  <MessageSquare size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm tracking-widest uppercase">Prodacom</p>
                  <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                    Online agora
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setExpanded(!expanded)} className="p-2 hover:bg-white/10 transition-colors" aria-label={expanded ? "Recolher" : "Expandir"}>
                  {expanded ? <Minimize2 size={14} strokeWidth={1.5} /> : <Maximize2 size={14} strokeWidth={1.5} />}
                </button>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10 transition-colors" aria-label="Fechar">
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ghost">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 bg-obsidian text-white flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <MessageSquare size={12} strokeWidth={1.5} />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-cobalt text-white"
                        : "bg-white border border-slate_mist text-obsidian"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Animação de "Digitando..." */}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-obsidian text-white flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={12} strokeWidth={1.5} />
                  </div>
                  <div className="bg-white border border-slate_mist px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-obsidian/40 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sugestões Rápidas */}
            {messages.length <= 1 && (
              <div className="px-5 py-3 border-t border-slate_mist bg-white flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendQuickReply(q)}
                    className="text-xs font-medium text-obsidian/70 border border-slate_mist px-3 py-1.5 hover:bg-cobalt hover:text-white hover:border-cobalt transition-all duration-200 flex items-center gap-1"
                  >
                    {q}
                    <ChevronRight size={12} strokeWidth={1.5} />
                  </button>
                ))}
              </div>
            )}

            {/* Barra de Contato Rápido */}
            <div className="px-5 py-2 border-t border-slate_mist bg-obsidian flex items-center justify-center gap-5">
              <a href="tel:+553132451265" className="flex items-center gap-1.5 text-[11px] font-mono text-white/60 hover:text-white transition-colors tracking-wider uppercase">
                <Phone size={11} strokeWidth={1.5} /> Ligar
              </a>
              <span className="w-px h-3 bg-white/20" />
              <a href="https://wa.me/5531993092473" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-mono text-white/60 hover:text-white transition-colors tracking-wider uppercase">
                <MessageSquare size={11} strokeWidth={1.5} /> WhatsApp
              </a>
              <span className="w-px h-3 bg-white/20" />
              <a href="mailto:comercial@prodacom.com.br" className="flex items-center gap-1.5 text-[11px] font-mono text-white/60 hover:text-white transition-colors tracking-wider uppercase">
                <Mail size={11} strokeWidth={1.5} /> Email
              </a>
            </div>

            {/* Campo de Digitação */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate_mist bg-white flex items-center gap-2 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className="flex-1 bg-ghost border border-slate_mist px-4 py-2.5 text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-cobalt transition-colors"
              />
              <button type="submit" className="bg-cobalt text-white p-2.5 hover:bg-obsidian transition-colors" aria-label="Enviar">
                <Send size={16} strokeWidth={1.5} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Flutuante (Abre/Fecha) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative bg-obsidian text-white w-14 h-14 flex items-center justify-center shadow-2xl group"
        aria-label="Abrir chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={22} strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-cobalt border-2 border-ghost rounded-full" />
        )}
      </motion.button>
    </div>
  );
}