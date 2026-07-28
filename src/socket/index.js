import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import jwt from "jsonwebtoken";
import redis from "../config/redis.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  // attach redis adapter
  const pubClient = redis;
  const subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("No token provided"));
    }
    // verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id} . user: ${socket.user.userId}`);
    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });

  return io;
};
