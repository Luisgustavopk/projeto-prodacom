// src/server.ts
import express from 'express';
import http from 'http';
import cors from 'cors';
import routes from './routes';
import { iniciarSocket } from './socket';
import { connectDatabase } from "./config/database";

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(routes);

// Cria o servidor HTTP do Node
const server = http.createServer(app);

// Inicia o WebSocket passando o servidor HTTP
iniciarSocket(server);

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    
    await connectDatabase();

   
    server.listen(PORT, () => {
      console.log(` [SERVER] Servidor modular da Prodacom rodando na porta ${PORT} `);
    });
  } catch (error) {
    console.error(" Falha crítica ao iniciar o servidor:", error);
  }
}


startServer();