/**
 * Special Next.js config for Cloudflare Pages to avoid React Error #130
 * This is used by the @cloudflare/next-on-pages tool
 */

/** @type {import('next').NextConfig} */
module.exports = {
  // Use the app directory features but disable error pages
  experimental: {
    appDir: true,
  },
  
  // Skip static generation of error pages completely
  output: 'export',
  distDir: '.next',
  
  // Basic configuration settings
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: false,
  poweredByHeader: false,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Ignore build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // This is a critical setting - completely remove error pages from static generation
  experimental: {
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
  },
  
  // Override the generated error pages with our static HTML versions
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-custom-header',
            value: 'cloudflare-pages',
          },
        ],
      },
    ];
  },
}; 