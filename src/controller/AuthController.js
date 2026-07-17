import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userData = await User.create({
      username: username,
      email: email,
      passwordHash: password,
    });
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      userData,
    });
  } catch (error) {
    console.log(error);
    if (error.keyValue.username) {
      res.status(500).json({
        success: false,
        message: "Username Already Exists",
        error: error.keyValue.username,
      });
    }
    if (error.keyValue.email) {
      res.status(500).json({
        success: false,
        message: "Email Already Exists",
        error: error.keyValue.email,
      });
    }
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
