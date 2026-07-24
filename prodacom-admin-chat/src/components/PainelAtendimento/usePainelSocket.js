import { useState, useEffect, useRef } from "react";
import { socket } from "../../services/socket";
import notificacaoAudio from "../../assets/sound/universfield-message-notification-199577.mp3"
export function usePainelSocket() {
  const [chats, setChats] = useState({});
  const [clienteAtivo, setClienteAtivo] = useState(null);
  const [input, setInput] = useState("");
  
  const clienteAtivoRef = useRef(clienteAtivo);

  // 1. Marca mensagens do cliente como Lidas ao ABRIR o chat (Sem F5)
  useEffect(() => {
    clienteAtivoRef.current = clienteAtivo;

    if (clienteAtivo) {
      const contatoLimpo = clienteAtivo.replace(/\D/g, "");
      
      // Avisa o backend para atualizar tudo no MongoDB
      socket.emit("marcar_como_lido", { contato: contatoLimpo });

      // Atualiza na mesma hora a tela do React
      setChats((prev) => {
        const chatAtual = prev[contatoLimpo];
        if (!chatAtual) return prev;

        let teveMudanca = false;
        
        // Transforma as mensagens recebidas em 'lido'
        const mensagensAtualizadas = chatAtual.mensagens.map(msg => {
          if (msg.role !== "admin" && msg.status !== "lido") {
            teveMudanca = true;
            return { ...msg, status: "lido" };
          }
          return msg;
        });

        // Só atualiza o estado se realmente havia algo não lido
        if (!teveMudanca && !chatAtual.unread) return prev;

        return {
          ...prev,
          [contatoLimpo]: { 
            ...chatAtual, 
            unread: false, 
            mensagens: mensagensAtualizadas 
          }
        };
      });
    }
  }, [clienteAtivo]);

  // 2. Eventos do Socket.IO
  useEffect(() => {
    function entrarComoAdmin() {
      socket.emit("entrar_como_admin");
    }

    if (!socket.connected) socket.connect();
    else entrarComoAdmin();

    socket.on("connect", entrarComoAdmin);

    socket.on("sincronizar_conversas_existentes", (historico) => {
      setChats(historico || {});
    });

    socket.on("status_cliente", (dados) => {
      if (!dados?.contato) return;
      const contatoNumerico = dados.contato.replace(/\D/g, "");

      setChats((prev) => {
        const chaveEncontrada = Object.keys(prev).find(key => key.replace(/\D/g, "") === contatoNumerico);
        if (!chaveEncontrada || !prev[chaveEncontrada]) return prev;

        return {
          ...prev,
          [chaveEncontrada]: { ...prev[chaveEncontrada], online: dados.online }
        };
      });
    });

    // 3. Recebendo NOVA mensagem do cliente
    socket.on("nova_mensagem_cliente", (dados) => {
      if (!dados?.contato) return;
      const chatId = dados.contato.replace(/\D/g, "");
      const isChatAberto = clienteAtivoRef.current?.replace(/\D/g, "") === chatId;

      if (!isChatAberto) {
        // Toca notificação apenas se o admin não estiver com a aba daquele cliente aberta
        new Audio(notificacaoAudio).play().catch(() => {});
      } else {
        // Se o chat JÁ ESTIVER ABERTO, avisa o backend que foi lido instantaneamente
        socket.emit("marcar_como_lido", { contato: chatId });
      }

      setChats((prev) => {
        const chatAtual = prev[chatId] || { nome: dados.autor, contato: chatId, online: true, mensagens: [] };
        
        return {
          ...prev,
          [chatId]: {
            ...chatAtual,
            online: true,
            unread: !isChatAberto,
            mensagens: [
              ...chatAtual.mensagens,
              { 
                role: "user", 
                content: dados.texto, 
                hora: dados.hora, 
                // Se a janela ta aberta, fica azul na hora. Se não, fica com status original.
                status: isChatAberto ? "lido" : (dados.status || "enviado") 
              }
            ]
          }
        };
      });
    });

    // 4. Recebendo confirmação de que o Cliente Leu (Virá do Widget no futuro)
    socket.on("status_mensagem_atualizado", (dados) => {
      if (!dados?.contato) return;
      const chatId = dados.contato.replace(/\D/g, "");

      setChats((prev) => {
        const chatAtual = prev[chatId];
        if (!chatAtual) return prev;

        const mensagensAtualizadas = chatAtual.mensagens.map((msg) => {
          if (msg.role === "admin") return { ...msg, status: dados.status };
          return msg;
        });

        return {
          ...prev,
          [chatId]: { ...chatAtual, mensagens: mensagensAtualizadas }
        };
      });
    });

    return () => {
      socket.off("connect", entrarComoAdmin);
      socket.off("sincronizar_conversas_existentes");
      socket.off("status_cliente");
      socket.off("nova_mensagem_cliente");
      socket.off("status_mensagem_atualizado");
      socket.disconnect();
    };
  }, []);

  // 5. Enviar Mensagem do Admin
  function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !clienteAtivo) return;

    const texto = input.trim();
    const hora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const chatId = clienteAtivo.replace(/\D/g, "");

    socket.emit("enviar_mensagem", { autor: "Admin", texto, hora, salaDestino: chatId });

    setChats((prev) => {
      const chatAtual = prev[chatId];
      if (!chatAtual) return prev;

      return {
        ...prev,
        [chatId]: {
          ...chatAtual,
          unread: false,
          mensagens: [
            ...chatAtual.mensagens,
            { role: "admin", autor: "Admin", content: texto, hora, status: "enviado" }
          ]
        }
      };
    });

    setInput("");
  }

  return { chats, clienteAtivo, setClienteAtivo, input, setInput, handleSend };
}