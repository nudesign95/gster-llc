// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false, // 🔒 Oculta el código fuente original en producción
  reactStrictMode: true,
};

export default nextConfig;