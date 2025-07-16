// lib/models/RecentArticlesModel.ts
import mongoose, { Schema } from "mongoose";

const RecentArticlesSchema = new Schema(
  {
    image: { type: String, required: true },
    text: { type: String, required: true },
    alt: { type: String, default: "Recent Article" },
  },
  { timestamps: true }
);

export default mongoose.models.RecentArticles ||
  mongoose.model("RecentArticles", RecentArticlesSchema);
