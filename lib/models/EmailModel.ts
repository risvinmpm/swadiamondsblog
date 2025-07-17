// models/Subscription.ts
import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
