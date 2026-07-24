import React, { createContext, useState, useEffect, useRef } from "react";
import { socket } from "../services/socket"; 

export const WebChatContext = createContext({});

export function WebChatProvider(props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);


  const [isAdminOnline, setIsAdminOnline] = useState(false);

  // 1. Memória das Mensagens
  const [messages, setMessages] = useState(function () {
    const salvas = localStorage.getItem("prodacom_chat_messages");
    return salvas ? JSON.parse(salvas) : [
      { role: "assistant", content: "Olá! Bem-vindo à Prodacom. Como podemos ajudar com a sua infraestrutura de ponto e acesso hoje?" }
    ];
  });

  // 2. Memória de Identificação
  const [isIdentified, setIsIdentified] = useState(function () {
    return localStorage.getItem("prodacom_chat_is_identified") === "true";
  });

  // 3. Memória dos Dados do Lead
  const [leadForm, setLeadForm] = useState(function () {
    const salvos = localStorage.getItem("prodacom_chat_lead_form");
    return salvos ? JSON.parse(salvos) : { nome: "", contato: "" };
  });

  const [isAskingContact, setIsAskingContact] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

 
  useEffect(() => {
    socket.on("status_admin", (status) => {
      setIsAdminOnline(status);
    });

    socket.emit("solicitar_status_admin");

    return () => {
      socket.off("status_admin");
    };
  }, []);


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

 
  useEffect(function () {
    if (isIdentified) {
      socket.connect();
      socket.emit("cliente_reconectado", {
        contato: leadForm.contato,
        nome: leadForm.nome
      });
    }
  }, [isIdentified]);

  useEffect(function () {
    function handleReceberMensagem(dados) {
      if (dados.autor !== leadForm.nome) {
        setMessages(function (prev) {
          return [...prev, { role: "assistant", content: dados.texto }];
        });
      }
    }

    socket.on("receber_mensagem", handleReceberMensagem);
    return function () {
      socket.off("receber_mensagem", handleReceberMensagem);
    };
  }, [leadForm.nome]);

  function handleFirstMessage(texto) {
    setMessages(function (prev) {
      return [...prev, { role: "user", content: texto }];
    });
    setPendingMessage(texto);
    setIsAskingContact(true);
    
    setTimeout(function () {
      setMessages(function (prev) {
        return [...prev, { 
          role: "assistant", 
          content: "Antes de responder sua pergunta, para dar continuidade a este atendimento, por favor insira seus dados abaixo" 
        }];
      });
    }, 600);
  }

  function handleStartChat(e) {
    e.preventDefault();
    if (!leadForm.nome || !leadForm.contato) return;

    setTimeout(function () {
      setMessages(function (prev) {
        return [...prev, { 
          role: "assistant", 
          content: "Obrigado pelos dados! Um de nossos consultores entrará em contato com você em breve para dar continuidade ao atendimento." 
        }];
      });
    }, 600);

    socket.connect();

    socket.emit("enviar_mensagem", {
      autor: leadForm.nome,
      contato: leadForm.contato,
      texto: pendingMessage,
      hora: new Date().toLocaleTimeString()
    });

    setIsAskingContact(false);
    setIsIdentified(true);
  }

  function handleSendNormal(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const texto = input.trim();
    setMessages(function (prev) {
      return [...prev, { role: "user", content: texto }];
    });
    setInput("");

    socket.emit("enviar_mensagem", {
      autor: leadForm.nome,
      contato: leadForm.contato, 
      texto: texto,
      hora: new Date().toLocaleTimeString()
    });
  }

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!isIdentified && !isAskingContact) {
      handleFirstMessage(input.trim());
      setInput("");
    } else {
      handleSendNormal(e);
    }
  }

  return (
    <WebChatContext.Provider value={{
      open, setOpen,
      expanded, setExpanded,
      input, setInput,
      messages, setMessages,
      isIdentified,
      leadForm, setLeadForm,
      isAskingContact,
      isAdminOnline, 
      messagesEndRef,
      handleFirstMessage,
      handleStartChat,
      handleSend
    }}>
      {props.children}
    </WebChatContext.Provider>
  );
}