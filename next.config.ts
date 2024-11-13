import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["img.clerk.com"], // Autoriser les images provenant de img.clerk.com
  },
};

export default nextConfig;
