"use client";

import { apiServer } from "@/config";
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(apiServer, {
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = () => socket;
