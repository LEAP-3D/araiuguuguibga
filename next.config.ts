import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "sw.js",
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  cacheStartUrl: true,
  fallbacks: {
    document: "/~offline",
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "img.clerk.com", pathname: "/**" },
      { protocol: "https", hostname: "images.clerk.dev", pathname: "/**" },
    ],
  },
};

export default withPWA(nextConfig);
