import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip static page generation to avoid useSearchParams errors
  experimental: {
    ppr: false,
  },
}

export default nextConfig;