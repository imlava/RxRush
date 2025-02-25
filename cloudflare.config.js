/**
 * Specialized Next.js config for Cloudflare Pages
 * This configuration disables static generation of error pages
 * to prevent React Error #130
 */

/** @type {import('next').NextConfig} */
const cloudflareConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = cloudflareConfig; 