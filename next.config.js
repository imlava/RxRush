/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output as it's not needed for Vercel
  // output: 'standalone',

  images: {
    domains: ['placehold.co', 'images.unsplash.com'],
    // Add Vercel's image optimization
    unoptimized: process.env.NODE_ENV === 'development',
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },

  // These are good defaults for Vercel
  reactStrictMode: true,
  swcMinify: true,

  // Remove trailingSlash as Vercel handles this automatically
  // trailingSlash: true,

  // Remove poweredByHeader as Vercel handles this
  // poweredByHeader: false,

  // Remove rewrites as they're not needed on Vercel
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: '/api/:path*',
  //     },
  //   ]
  // },

  // Vercel handles CORS automatically, so we can remove the headers config
  // async headers() { ... }

  // Explicitly set webpack config to help resolve modules
  webpack: (config) => {
    // Add aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/',
    };
    
    return config;
  },
};

module.exports = nextConfig;
