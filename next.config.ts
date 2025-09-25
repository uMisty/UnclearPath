import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用standalone输出模式以减小Docker镜像大小
  output: "standalone",

  // 优化配置
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
