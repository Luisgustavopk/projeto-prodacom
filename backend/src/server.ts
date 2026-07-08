import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

// Inicializamos o servidor Express
const app = express();
app.use(cors());

// Criamos o servidor HTTP
const server = http.createServer(app);

// Configuramos o Socket.io com os tipos corretos
const io = new Server(server, {
  cors: {
    origin: "*", // Permite acesso de qualquer site
    methods: ["GET", "POST"]
  }
});

// Tipando os dados que vamos receber para não ter erro no futuro
interface DadosMensagem {
  texto: string;
  autor: string;
  hora: string;
}

// EVENTO PRINCIPAL
io.on('connection', (socket: Socket) => {
  console.log(` Um usuário se conectou! ID do tubo: ${socket.id}`);

  // Escutando a mensagem recebida e dizendo ao TS o formato esperado
  socket.on('enviar_mensagem', (dadosDaMensagem: DadosMensagem) => {
    console.log("Mensagem recebida no servidor:", dadosDaMensagem);
    
    // Retransmite para todos
    io.emit('receber_mensagem', dadosDaMensagem);
  });

  socket.on('disconnect', () => {
    console.log(` O usuário ${socket.id} saiu do site.`);
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Servidor de Chat com TypeScript rodando na porta ${PORT} 🚀`);
});