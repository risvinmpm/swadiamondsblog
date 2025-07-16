// lib/models/DiamondModel.ts
import mongoose, { Schema, models, Model } from "mongoose";

export interface IDiamond {
  title: string;
  description: string;
  image: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DiamondSchema = new Schema<IDiamond>(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    image:       { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default (models.Diamond as Model<IDiamond>) ||
  mongoose.model<IDiamond>("Diamond", DiamondSchema);
