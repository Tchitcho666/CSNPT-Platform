import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  experimental: {
    serverActions: { bodySizeLimit: '26mb' },
  },
};

export default nextConfig;
