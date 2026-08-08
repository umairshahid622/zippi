import { io, type Socket } from "socket.io-client";
import { store } from "../store";
import { setConnectionStatus } from "../store/slices/connectionSlice";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  const token = store.getState().auth.token;

  socket = io(import.meta.env.VITE_API_URL.replace("/api", ""), {
    auth: { token },
    autoConnect: true,
  });

  socket.on("connect", () => {
    store.dispatch(setConnectionStatus("online"));
  });

  socket.on("disconnect", () => {
    store.dispatch(setConnectionStatus("offline"));
  });

  socket.on("reconnect_attempt", () => {
    store.dispatch(setConnectionStatus("connecting"));
  });

  socket.on("connect_error", (err) => {
    store.dispatch(setConnectionStatus("offline"));
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket)
    throw new Error("Socket not connected — call connectSocket() first");
  return socket;
};

export const isSocketConnected = (): boolean => socket?.connected ?? false;

export const disconnectSocket = (): void => {
  socket?.disconnect();
  socket = null;
};
