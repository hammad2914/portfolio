import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Original Jenna CSS is served from /public/css — avoid bundling it through webpack.
};

export default nextConfig;
