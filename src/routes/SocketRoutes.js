import express from "express";
import { publish, notification } from "../controller/SocketController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/publish", authMiddleware, publish);
router.get("/notification/:channel", authMiddleware, notification);

export default router;
