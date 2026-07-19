import express from "express";
import { registerUser, LoginUser } from "../controller/AuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);
// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome !",
    user: req.user,
  });
});

export default router;
