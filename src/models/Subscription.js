import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  channel: {
    type: String,
    required: true,
    trim: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

subscriptionSchema.index({ userId: 1, channel: 1 }, { unique: true });

export default mongoose.model("Subscription", subscriptionSchema);
