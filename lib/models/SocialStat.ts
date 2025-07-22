import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  label: String,
  count: String,
  icon: String,
});

const SocialStatsSchema = new mongoose.Schema({
  items: [ItemSchema],
});

export default mongoose.models.SocialStats ||
  mongoose.model("SocialStats", SocialStatsSchema);
