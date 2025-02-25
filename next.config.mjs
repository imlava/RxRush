/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true // Temporarily ignore TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true // Temporarily ignore ESLint errors during build
  },
  trailingSlash: true,
  reactStrictMode: true,
}

export default nextConfig
