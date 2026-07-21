import User from "../models/User.js";
import Notification from "../models/Notification.js";
import dotenv from "dotenv";

export const publish = async (req, res) => {
  try {
    const { channel, payload } = req.body;
    if (!channel || !payload) {
      return res.status(400).json({
        message: "Insufficient Data",
      });
    }
    const notificationData = await Notification.create({
        channel: channel,
        payload: payload,
        publishedBy: req.user.id
    })
    return res.status(200).json({
        notificationData
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
