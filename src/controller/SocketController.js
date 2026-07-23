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
      publishedBy: req.user.id,
    });
    return res.status(200).json({
      notificationData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const notification = async (req, res) => {
  try {
    const channel = req.params.channel;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const notificationData = await Notification.find({ channel: channel })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Notification.countDocuments({ channel });
    return res.status(200).json({
      data: notificationData,
      page: page,
      limit: limit,
      total: totalCount,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
