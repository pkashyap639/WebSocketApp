import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "./config/redis.js";
import authRoutes from "./routes/AuthRoutes.js";
import SocketRoutes from "./routes/SocketRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
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
