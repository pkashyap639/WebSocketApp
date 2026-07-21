import express from "express";
import { publish } from "../controller/SocketController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/publish", authMiddleware, publish);

export default router;
