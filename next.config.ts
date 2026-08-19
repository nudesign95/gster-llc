/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora los errores de TypeScript al compilar en Vercel
    ignoreDuringBuilds: true,
  },
  eslint: {
    // Ignora las advertencias de ESLint al compilar en Vercel
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig