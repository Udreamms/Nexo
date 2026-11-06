import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:4000";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nexo/shared"],
  async rewrites() {
    // El frontend llama a /api/* y Next lo reenvía al servicio backend.
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },
};

export default config;
