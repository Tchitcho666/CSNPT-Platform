import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  turbopack: { root: process.cwd() },
  async redirects() {
    return [{ source: '/espace-professionnel', destination: '/espace-pro/login', permanent: true }];
  },
  experimental: {
    serverActions: { bodySizeLimit: '26mb' },
  },
};

export default nextConfig;
