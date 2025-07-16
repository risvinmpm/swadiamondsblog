import mongoose, { Schema } from "mongoose";

const WhatsNewSchema = new Schema(
  {
    image: { type: String, required: true },
    text: { type: String, required: true },
    alt: { type: String, default: "Whats new image" },
  },
  { timestamps: true }
);

export default mongoose.models.WhatsNew || mongoose.model("WhatsNew", WhatsNewSchema);
