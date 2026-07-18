import express from "express";
import { registerUser, LoginUser } from "../controller/AuthController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);

export default router;
