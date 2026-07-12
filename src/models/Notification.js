import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema({
  channel: {
    type: String,
    required: [true, "Channel name Required"],
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  publishedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  deliveredTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Automatically delete documents after 30 days
notificationSchema.index(
  { publishedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 },
);
export default mongoose.model("Notification", notificationSchema);
