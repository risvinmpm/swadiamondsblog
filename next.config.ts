import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ["swadiamonds.netlify.app", "res.cloudinary.com"]
  },
  env: {
    CLOUDINARY_CLOUD_NAME: "dony6ysvd",
    CLOUDINARY_API_KEY: "791941355651216",
    CLOUDINARY_API_SECRET: "hsxXBednfLbDftIVKskBFt3tQH0",
    MONGODB_URI:
      "mongodb+srv://admin:admin@cluster0.mailstw.mongodb.net/swadiamonds-blog"
  }
};

export default nextConfig;
