import mongoose, { Schema } from "mongoose";

const FooterContentSchema = new Schema(
  {
    aboutText: { type: String, required: true },
    newsletterText: { type: String, required: true },
    newsletterHeading: { type: String, required: true },
    instagramHeading: { type: String, required: true },
    instagramImages: { type: [String], required: true },
    socialLinks: {
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      pinterest: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.FooterContent ||
  mongoose.model("FooterContent", FooterContentSchema);
