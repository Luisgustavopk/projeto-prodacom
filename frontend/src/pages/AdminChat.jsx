import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { MessageSquare, Send, User, Phone, Clock, Monitor } from "lucide-react";

export default function AdminChat() {
  // Estado para armazenar todas as conversas. 
  // Formato: { "idDoCliente": { nome, contato, mensagens: [] } }
  const [chats, setChats] = useState({});
  const [clienteAtivo, setClienteAtivo] = useState(null); // Qual cliente o admin está visualizando
  const [input, setInput] = useState("");
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Faz a rolagem automática sempre que chegam mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, clienteAtivo]);

  useEffect(() => {
    // 1. Conecta ao servidor backend
    socketRef.current = io("http://localhost:3001");

    // 2. Avisa que este é o painel de Admin
    socketRef.current.emit("entrar_como_admin");

    // 3. Fica escutando novas mensagens dos clientes
    socketRef.current.on("nova_mensagem_cliente", (dados) => {
      setChats((prevChats) => {
        // Pega o histórico do cliente ou cria um novo se for a primeira vez
        const chatAtual = prevChats[dados.idDoCliente] || {
          nome: dados.autor,
          contato: dados.contato,
          mensagens: []
        };

        return {
          ...prevChats,
          [dados.idDoCliente]: {
            ...chatAtual,
            mensagens: [...chatAtual.mensagens, { role: "user", content: dados.texto, hora: dados.hora }]
          }
        };
      });
    });

    // Limpa a conexão se o admin fechar a tela
    return () => socketRef.current.disconnect();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !clienteAtivo) return;

    const texto = input.trim();
    const hora = new Date().toLocaleTimeString();

    // 1. Envia a resposta para o servidor, indicando a "salaDestino" (ID do cliente)
    socketRef.current.emit("enviar_mensagem", {
      autor: "Admin",
      texto: texto,
      hora: hora,
      salaDestino: clienteAtivo // O pulo do gato!
    });

    // 2. Atualiza a tela do admin para mostrar a mensagem que ele mesmo enviou
    setChats((prev) => ({
      ...prev,
      [clienteAtivo]: {
        ...prev[clienteAtivo],
        mensagens: [...prev[clienteAtivo].mensagens, { role: "admin", content: texto, hora: hora }]
      }
    }));

    setInput("");
  };

  const conversasAtivas = Object.entries(chats);

  return (
    <div className="flex h-screen bg-ghost font-sans">
      
      {/* BARRA LATERAL - LISTA DE CLIENTES */}
      <div className="w-1/3 max-w-sm bg-obsidian flex flex-col border-r border-white/10">
        <div className="p-6 bg-obsidian border-b border-white/10 flex items-center gap-3">
          <Monitor className="text-cobalt" size={24} />
          <div>
            <h1 className="text-white font-display font-bold uppercase tracking-wider text-sm">Painel de Atendimento</h1>
            <p className="text-emerald-400 text-xs flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversasAtivas.length === 0 ? (
            <div className="text-white/40 text-center text-sm p-10 mt-10">
              Nenhum cliente na fila no momento.
            </div>
          ) : (
            conversasAtivas.map(([id, dados]) => (
              <button
                key={id}
                onClick={() => setClienteAtivo(id)}
                className={`w-full text-left p-4 border-b border-white/5 transition-colors flex flex-col gap-1 ${
                  clienteAtivo === id ? "bg-cobalt/20 border-l-4 border-l-cobalt" : "hover:bg-white/5 border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-white font-medium text-sm">{dados.nome}</span>
                  {dados.mensagens.length > 0 && (
                    <span className="text-white/40 text-[10px]">{dados.mensagens[dados.mensagens.length - 1].hora}</span>
                  )}
                </div>
                <span className="text-white/50 text-xs truncate w-full">
                  {dados.mensagens.length > 0 ? dados.mensagens[dados.mensagens.length - 1].content : "Nova conversa"}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ÁREA PRINCIPAL DO CHAT */}
      <div className="flex-1 flex flex-col bg-white">
        {clienteAtivo && chats[clienteAtivo] ? (
          <>
            {/* Header do Chat Ativo */}
            <div className="p-6 bg-white border-b border-slate_mist flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ghost rounded-full flex items-center justify-center text-obsidian/40">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-obsidian font-bold text-sm uppercase tracking-wider">{chats[clienteAtivo].nome}</h2>
                  <a href={`https://wa.me/${chats[clienteAtivo].contato.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-cobalt text-xs flex items-center gap-1 hover:underline mt-0.5">
                    <Phone size={12} /> {chats[clienteAtivo].contato}
                  </a>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-ghost/30">
              {chats[clienteAtivo].mensagens.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "admin" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-5 py-3 text-sm leading-relaxed relative ${
                      msg.role === "admin"
                        ? "bg-cobalt text-white rounded-l-xl rounded-tr-xl"
                        : "bg-white border border-slate_mist text-obsidian rounded-r-xl rounded-tl-xl shadow-sm"
                    }`}
                  >
                    {msg.content}
                    <div className={`text-[10px] mt-1 text-right flex items-center justify-end gap-1 ${msg.role === "admin" ? "text-white/60" : "text-obsidian/40"}`}>
                      <Clock size={10} /> {msg.hora}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Área de Digitação */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate_mist flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Responder ${chats[clienteAtivo].nome}...`}
                className="flex-1 bg-ghost border border-slate_mist px-5 py-3 text-sm text-obsidian placeholder:text-obsidian/40 focus:outline-none focus:border-cobalt transition-colors rounded-full"
              />
              <button type="submit" className="bg-cobalt text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-obsidian transition-colors shadow-md">
                <Send size={18} className="ml-1" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-obsidian/30 bg-ghost/30">
            <MessageSquare size={48} className="mb-4 opacity-50" />
            <p className="text-sm uppercase tracking-widest font-medium">Selecione uma conversa para iniciar</p>
          </div>
        )}
      </div>
    </div>
  );
}