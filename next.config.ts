import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['swadiamonds.netlify.app'],
  },
};

export default nextConfig;
