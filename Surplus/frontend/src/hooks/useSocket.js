import {
  useEffect,
} from "react";

import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_SOCKET_URL ||
    "http://localhost:5000",
  {
    autoConnect: false,
  }
);

export const useSocket = (
  userId
) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect();

    socket.emit(
      "join-user",
      userId
    );

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socket;
};
