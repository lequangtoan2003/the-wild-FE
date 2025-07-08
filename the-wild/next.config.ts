import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua kiểm tra ESLint trong build
  },
};

export default nextConfig;