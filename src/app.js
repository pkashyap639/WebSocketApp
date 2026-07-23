import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "./config/redis.js";
import authRoutes from "./routes/AuthRoutes.js";
import SocketRoutes from "./routes/SocketRoutes.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? "ok" : "down";

  let redisStatus = "ok";
  try {
    await redis.ping();
  } catch (err) {
    redisStatus = "down";
  }

  const allOk = mongoStatus === "ok" && redisStatus === "ok";

  res.status(allOk ? 200 : 503).json({
    mongodb: mongoStatus,
    redis: redisStatus,
    uptime: process.uptime(),
  });
});

app.use("/", authRoutes);
app.use("/", SocketRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
startServer();
export default app;
