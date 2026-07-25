import { io, type Socket } from "socket.io-client";
import { store } from "../store";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  const token = store.getState().auth.token;

  socket = io(import.meta.env.VITE_API_URL.replace("/api", ""), {
    auth: { token },
    autoConnect: true,
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket)
    throw new Error("Socket not connected — call connectSocket() first");
  return socket;
};

export const disconnectSocket = (): void => {
  socket?.disconnect();
  socket = null;
};
