import { useState, useEffect, useRef } from "react";
import { socket } from "../../services/socket";
import notificacaoAudio from "../../assets/sound/universfield-message-notification-199577.mp3";

export function usePainelSocket() {
  const [chats, setChats] = useState({});
  const [clienteAtivo, setClienteAtivo] = useState(null);
  const [input, setInput] = useState("");
  const [canalAtivo, setCanalAtivo] = useState("site");
  
  const clienteAtivoRef = useRef(clienteAtivo);
  const canalAtivoRef = useRef(canalAtivo); 

  useEffect(() => {
    canalAtivoRef.current = canalAtivo;
  }, [canalAtivo]);

  useEffect(() => {
    clienteAtivoRef.current = clienteAtivo;

    if (clienteAtivo) {
      const contatoLimpo = clienteAtivo.replace(/\D/g, "");
      socket.emit("marcar_como_lido", { contato: contatoLimpo });

      setChats((prev) => {
        const chatAtual = prev[contatoLimpo];
        if (!chatAtual) return prev;

        let teveMudanca = false;
        const mensagensAtualizadas = chatAtual.mensagens.map(msg => {
          if (msg.role !== "admin" && msg.status !== "lido") {
            teveMudanca = true;
            return { ...msg, status: "lido" };
          }
          return msg;
        });

        if (!teveMudanca && !chatAtual.unread) return prev;

        return {
          ...prev,
          [contatoLimpo]: { ...chatAtual, unread: false, mensagens: mensagensAtualizadas }
        };
      });
    }
  }, [clienteAtivo]);

  useEffect(() => {
    function entrarComoAdmin() {
      socket.emit("entrar_como_admin");
    }

    if (!socket.connected) socket.connect();
    else entrarComoAdmin();

    socket.on("connect", entrarComoAdmin);

    socket.on("sincronizar_conversas_existentes", (historico) => {
      const historicoComCanal = {};
      Object.keys(historico || {}).forEach(key => {
        historicoComCanal[key] = {
          ...historico[key],
          canal: historico[key].canal || 'site'
        };
      });
      setChats(historicoComCanal);
    });

    socket.on("status_cliente", (dados) => {
      if (!dados?.contato) return;
      const contatoNumerico = dados.contato.replace(/\D/g, "");
      setChats((prev) => {
        const chave = Object.keys(prev).find(key => key.replace(/\D/g, "") === contatoNumerico);
        if (!chave || !prev[chave]) return prev;
        return { ...prev, [chave]: { ...prev[chave], online: dados.online } };
      });
    });

    // ==========================================
    // ESCUTA O CHAT DO SITE
    // ==========================================
    socket.on("nova_mensagem_cliente", (dados) => {
      if (!dados?.contato) return;
      const chatId = dados.contato.replace(/\D/g, "");
      const isChatAberto = clienteAtivoRef.current?.replace(/\D/g, "") === chatId && canalAtivoRef.current === 'site';

      if (!isChatAberto) {
        new Audio(notificacaoAudio).play().catch(() => {});
      } else {
        socket.emit("marcar_como_lido", { contato: chatId });
      }

      setChats((prev) => {
        const chatAtual = prev[chatId] || { nome: dados.autor, contato: chatId, online: true, mensagens: [], canal: 'site' };
        return {
          ...prev,
          [chatId]: {
            ...chatAtual,
            canal: 'site', 
            online: true,
            unread: !isChatAberto,
            lastMessageAt: new Date().toISOString(),
            mensagens: [
              ...chatAtual.mensagens,
              { role: "user", content: dados.texto, hora: dados.hora, status: isChatAberto ? "lido" : (dados.status || "enviado") }
            ]
          }
        };
      });
    });

    // ==========================================
    // ESCUTA O CHAT DO WHATSAPP 
    // ==========================================
    socket.on("nova_mensagem_whatsapp", (dados) => {
      if (!dados?.contato) return;
      const chatId = dados.contato.replace(/\D/g, "");
      // Só considera aberto se o cliente estiver selecionado E a aba for whatsapp
      const isChatAberto = clienteAtivoRef.current?.replace(/\D/g, "") === chatId && canalAtivoRef.current === 'whatsapp';

      if (!isChatAberto) {
        new Audio(notificacaoAudio).play().catch(() => {});
      }

      setChats((prev) => {
        const chatAtual = prev[chatId] || { nome: dados.contato, contato: chatId, online: true, mensagens: [], canal: 'whatsapp' };
        return {
          ...prev,
          [chatId]: {
            ...chatAtual,
            canal: 'whatsapp', // Marca a origem
            unread: !isChatAberto,
            lastMessageAt: new Date().toISOString(),
            mensagens: [
              ...chatAtual.mensagens,
              { role: "user", content: dados.texto, hora: dados.hora || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), status: "lido" }
            ]
          }
        };
      });
    });

    socket.on("status_mensagem_atualizado", (dados) => {
      if (!dados?.contato) return;
      const chatId = dados.contato.replace(/\D/g, "");
      setChats((prev) => {
        const chatAtual = prev[chatId];
        if (!chatAtual) return prev;
        const msgs = chatAtual.mensagens.map(msg => msg.role === "admin" ? { ...msg, status: dados.status } : msg);
        return { ...prev, [chatId]: { ...chatAtual, mensagens: msgs } };
      });
    });

    socket.on("mensagem_enviada_sucesso", (dados) => {
      setChats((prev) => {
        const chat = prev[dados.contato];
        if (!chat) return prev;
        const msgs = [...chat.mensagens];
        for (let i = msgs.length - 1; i >= 0; i--) {
          if (msgs[i].role === "admin" && !msgs[i].id) {
           msgs[i] = { ...msgs[i], id: dados.id };
           break;
          }
        }
        return { ...prev, [dados.contato]: { ...chat, mensagens: msgs } };
      });
    });

    socket.on("mensagem_apagada", (dados) => {
      setChats((prev) => {
        const chat = prev[dados.contato];
        if (!chat) return prev;
        return { ...prev, [dados.contato]: { ...chat, mensagens: chat.mensagens.map(m => m.id === dados.idMensagem ? { ...m, content: "Mensagem apagada", apagada: true } : m) } };
      });
    });

    socket.on("conversa_removida", (dados) => {
      setChats((prev) => { const n = { ...prev }; delete n[dados.contato]; return n; });
      if (clienteAtivoRef.current === dados.contato) setClienteAtivo(null);
    });

    socket.on("restaurar_conversa", (conversa) => {
      if (!conversa) return;
      setChats((prev) => ({ ...prev, [conversa.contato]: { ...conversa, canal: conversa.canal || 'site' } }));
    });

   socket.on("status_atendimento_alterado", (dados) => {
      setChats((prev) => {
        const chatAtual = prev[dados.contato];
        if (!chatAtual) return prev;
        return { ...prev, [dados.contato]: { ...chatAtual, statusAtendimento: dados.status } };
      });
    });

    return () => {
      socket.off("connect"); socket.off("sincronizar_conversas_existentes"); socket.off("status_cliente");
      socket.off("nova_mensagem_cliente"); socket.off("nova_mensagem_whatsapp"); socket.off("status_mensagem_atualizado"); 
      socket.off("mensagem_enviada_sucesso"); socket.off("mensagem_apagada"); socket.off("conversa_removida"); 
      socket.off("restaurar_conversa"); socket.disconnect();
    };
  }, []);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !clienteAtivo) return;
    const texto = input.trim();
    const hora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const chatId = clienteAtivo.replace(/\D/g, "");
    
    if (canalAtivoRef.current === 'whatsapp') {
      socket.emit("enviar_mensagem_whatsapp", { contato: chatId, texto, hora });
    } else {
      socket.emit("enviar_mensagem", { autor: "Admin", texto, hora, salaDestino: chatId });
    }
    
    setChats((prev) => {
      const chat = prev[chatId];
      if (!chat) return prev;
      return { ...prev, [chatId]: { ...chat, unread: false, lastMessageAt: new Date().toISOString(), mensagens: [ ...chat.mensagens, { role: "admin", content: texto, hora, status: "enviado" } ] } };
    });
    setInput("");
  }

  function mudarStatusAtendimento(contato, novoStatus) {
    const chatId = contato.replace(/\D/g, "");
    socket.emit("alterar_status_atendimento", { contato: chatId, status: novoStatus });
    setChats((prev) => {
      const chat = prev[chatId];
      if (!chat) return prev;
      return { ...prev, [chatId]: { ...chat, statusAtendimento: novoStatus } };
    });
  }

 return { 
   chats, clienteAtivo, setClienteAtivo, input, setInput, handleSend, mudarStatusAtendimento,
   canalAtivo, setCanalAtivo 
 };
}