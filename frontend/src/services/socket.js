import { io } from "socket.io-client";
import apiUrl from "../config/api.js";
const URL_SERVIDOR = apiUrl;

export const socket = io(URL_SERVIDOR, {
  autoConnect: false,
});