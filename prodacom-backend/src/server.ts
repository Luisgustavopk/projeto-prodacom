// src/server.ts
import express from 'express';
import http from 'http';
import cors from 'cors';
import routes from './routes';
import { iniciarSocket } from './socket';
import { connectDatabase } from "./config/database";
import { whatsappController } from './controllers/whatsappController'; 

const app = express();
app.use(cors());
app.use(express.json()); 

const server = http.createServer(app);

const io = iniciarSocket(server);

app.use('/webhook/whatsapp', whatsappController(io));

app.use(routes);

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