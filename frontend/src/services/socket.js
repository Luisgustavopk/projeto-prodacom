import { io } from "socket.io-client";

const URL_SERVIDOR = "http://localhost:3001";

export const socket = io(URL_SERVIDOR, {
  autoConnect: false,
});