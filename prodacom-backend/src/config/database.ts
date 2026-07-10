import mongoose from "mongoose";
import dns from "dns";


if (process.env.USE_CUSTOM_DNS === "true") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}


const MONGO_URI = process.env.MONGO_URI || "";

export async function connectDatabase() {
  try {
    if (!MONGO_URI) {
      throw new Error("A variável MONGO_URI não foi definida no arquivo .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("[DATABASE] Conexão com o MongoDB Atlas estabelecida com sucesso!");
  } catch (error) {
    console.error(" [DATABASE] Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}