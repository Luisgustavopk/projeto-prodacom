// src/server.ts
import express from 'express';
import http from 'http';
import cors from 'cors';
import { iniciarSocket } from './socket';

const app = express();
app.use(cors());

// Cria o servidor HTTP do Node
const server = http.createServer(app);

// Inicia o WebSocket passando o servidor HTTP
iniciarSocket(server);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor de Chat modular rodando na porta ${PORT} 🚀`);
});