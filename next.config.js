/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't use 'output: "export"' as it forces static generation
  output: 'standalone',

  // Enable proper image optimization
  images: {
    domains: ['your-image-domain.com'],
    // Don't use unoptimized: true unless absolutely necessary
  },

  // Add proper environment variable handling
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },

  // Ensure proper static generation
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Add rewrites to handle API routes properly
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
};

module.exports = nextConfig;
