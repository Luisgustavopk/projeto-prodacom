import { io } from "socket.io-client";
import apiUrl from "../config/env.js";
const URL_SERVIDOR = apiUrl;

export const socket = io(URL_SERVIDOR, {
  autoConnect: false,
});