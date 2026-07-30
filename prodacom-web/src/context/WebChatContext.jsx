import React, { createContext, useState, useEffect, useRef } from "react";
import { socket } from "../services/socket"; 
import notificacaoAudio from "../assets/sound/universfield-message-notification-199577.mp3";

export const WebChatContext = createContext({});

export function WebChatProvider(props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [unreadCount, setUnreadCount] = useState(0); 
  const messagesEndRef = useRef(null);

  const [isAdminOnline, setIsAdminOnline] = useState(false);

  const openRef = useRef(open);
  const leadFormRef = useRef({ nome: "", contato: "" });

  const [messages, setMessages] = useState(function () {
    const salvas = localStorage.getItem("prodacom_chat_messages");
    return salvas ? JSON.parse(salvas) : [
      { 
        role: "assistant", 
        content: "Olá! Bem-vindo à Prodacom. Como podemos ajudar com a sua infraestrutura de ponto e acesso hoje?",
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [isIdentified, setIsIdentified] = useState(function () {
    return localStorage.getItem("prodacom_chat_is_identified") === "true";
  });

  const [leadForm, setLeadForm] = useState(function () {
    const salvos = localStorage.getItem("prodacom_chat_lead_form");
    return salvos ? JSON.parse(salvos) : { nome: "", contato: "" };
  });

  const [isAskingContact, setIsAskingContact] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

  useEffect(() => { openRef.current = open; }, [open]);
  useEffect(() => { leadFormRef.current = leadForm; }, [leadForm]);

  useEffect(function () {
    localStorage.setItem("prodacom_chat_messages", JSON.stringify(messages));
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(function () {
    localStorage.setItem("prodacom_chat_is_identified", isIdentified);
    localStorage.setItem("prodacom_chat_lead_form", JSON.stringify(leadForm));
  }, [isIdentified, leadForm]);

  useEffect(() => {
    if (open && isIdentified && leadForm.contato) {
      setUnreadCount(0);
      const contatoLimpo = leadForm.contato.replace(/\D/g, "");
      socket.emit("atualizar_status_mensagem", { contato: contatoLimpo, roleTarget: "admin", status: "lido" });
    }
  }, [open, isIdentified]);

  useEffect(() => {
    socket.on("status_admin", (status) => setIsAdminOnline(status));
    socket.emit("solicitar_status_admin");

    if (isIdentified) {
      if (!socket.connected) socket.connect();
      socket.emit("cliente_reconectado", { contato: leadForm.contato, nome: leadForm.nome });
    }

    return () => socket.off("status_admin");
  }, [isIdentified]);

  useEffect(function () {
    function handleReceberMensagem(dados) {
      const contatoAtual = leadFormRef.current.contato.replace(/\D/g, "");
      if (dados.autor !== leadFormRef.current.nome) {
        setMessages((prev) => [...prev, { id: dados.id, role: "assistant", content: dados.texto, hora: dados.hora }]);
        if (!openRef.current) {
          new Audio(notificacaoAudio).play().catch(() => {});
          setUnreadCount((prev) => prev + 1);
        } else {
          socket.emit("atualizar_status_mensagem", { contato: contatoAtual, roleTarget: "admin", status: "lido" });
        }
      }
    }

    function handleMensagensVisualizadas() {
      setMessages((prev) => prev.map(msg => msg.role === "user" ? { ...msg, status: "lido" } : msg));
    }

    socket.on("mensagem_enviada_sucesso", (dados) => {
      setMessages((prev) => {
        let encontrouNaTela = false;
        const novoArray = prev.map(msg => {
          if (msg.role === "user" && !msg.id && msg.content === dados.texto && msg.hora === dados.hora) {
            encontrouNaTela = true;
            return { ...msg, id: dados.id };
          }
          return msg;
        });
        return novoArray;
      });
    });

    socket.on("mensagem_apagada", (dados) => {
      setMessages((prev) => prev.map(m => m.id === dados.idMensagem ? { ...m, content: "Mensagem apagada", apagada: true } : m));
    });

    socket.on("historico_mensagens_cliente", (historicoBanco) => {
      setMessages([
        { 
          role: "assistant", 
          content: "Olá! Bem-vindo à Prodacom. Como podemos ajudar com a sua infraestrutura de ponto e acesso hoje?",
          hora: historicoBanco.length > 0 ? historicoBanco[0].hora : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...historicoBanco
      ]);
    });

    socket.on("receber_mensagem", handleReceberMensagem);
    socket.on("mensagens_visualizadas", handleMensagensVisualizadas);

    return function () {
      socket.off("receber_mensagem", handleReceberMensagem);
      socket.off("mensagens_visualizadas", handleMensagensVisualizadas);
      socket.off("mensagem_enviada_sucesso");
      socket.off("mensagem_apagada");
      socket.off("historico_mensagens_cliente");
    };
  }, []);

  function handleFirstMessage(texto) {
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { role: "user", content: texto, hora, status: "enviado" }]);
    setPendingMessage(texto);
    setIsAskingContact(true);
    
    setTimeout(function () {
      setMessages((prev) => [...prev, { role: "assistant", content: "Antes de responder sua pergunta, para dar continuidade a este atendimento, por favor insira seus dados abaixo", hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);
  }

  function handleStartChat(e) {
    e.preventDefault();
    if (!leadForm.nome || !leadForm.contato) return;

    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTimeout(function () {
      setMessages((prev) => [...prev, { role: "assistant", content: "Obrigado pelos dados! Um de nossos consultores entrará em contato com você em breve para dar continuidade ao atendimento.", hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);

    if (!socket.connected) socket.connect();
    socket.emit("enviar_mensagem", { autor: leadForm.nome, contato: leadForm.contato, texto: pendingMessage, hora: hora });

    setIsAskingContact(false);
    setIsIdentified(true);
  }

  function handleSendNormal(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const texto = input.trim();
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { role: "user", content: texto, hora, status: "enviado" }]);
    setInput("");

    socket.emit("enviar_mensagem", { autor: leadForm.nome, contato: leadForm.contato, texto: texto, hora: hora });
  }

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    if (!isIdentified && !isAskingContact) {
      handleFirstMessage(input.trim()); setInput("");
    } else {
      handleSendNormal(e);
    }
  }

  function handleApagarMensagemCliente(idMensagem) {
    console.log("=> [CONTEXT] Função handleApagarMensagemCliente acionada para o ID:", idMensagem);
    if (!idMensagem) {
      console.warn("=> [CONTEXT] ERRO: idMensagem está indefinido!");
      return;
    }
    if (!socket.connected) {
      socket.connect();
    }
    const contatoAtual = leadFormRef.current.contato.replace(/\D/g, "");
    socket.emit("apagar_mensagem", { idMensagem: idMensagem, contato: contatoAtual });
  }

  return (
    <WebChatContext.Provider value={{
      open, setOpen, expanded, setExpanded, input, setInput,
      messages, setMessages, isIdentified, leadForm, setLeadForm,
      isAskingContact, isAdminOnline, messagesEndRef, unreadCount, 
      handleFirstMessage, handleStartChat, handleSend, handleApagarMensagemCliente
    }}>
      {props.children}
    </WebChatContext.Provider>
  );
}