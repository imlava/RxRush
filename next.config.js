/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Ensure proper static generation
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: false,
  // Disable static error pages generation to prevent React error #130
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  // Explicitly disable static generation for error pages
  exportPathMap: async function (defaultPathMap) {
    // Filter out error pages from static generation
    const filteredMap = { ...defaultPathMap };
    delete filteredMap['/404'];
    delete filteredMap['/500'];
    return filteredMap;
  },
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
