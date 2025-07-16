import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  title: string;
  image: string;
  alt: string;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { timestamps: true }
);

const BannerModel =
  mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

export default BannerModel;
