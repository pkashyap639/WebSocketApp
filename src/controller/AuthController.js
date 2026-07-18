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

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user
    const user = await User.findOne({
      email,
    });
    // check if user exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    // match password
    const isMatch = await user.comparePassword(password);
    // check if password is correct
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    // Login Successful
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
    return res.send(user);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
