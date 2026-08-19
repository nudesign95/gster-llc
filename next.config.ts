/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Nombre correcto para ignorar errores de TS en el build
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig