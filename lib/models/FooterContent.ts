import mongoose, { Schema } from "mongoose";

const FooterSchema = new Schema({
  aboutText: { type: String, required: true },
  newsletterText: { type: String, required: true },
  instagramImages: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.FooterContent ||
  mongoose.model("FooterContent", FooterSchema);
