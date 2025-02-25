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
  // Skip error pages in static generation
  exportPathMap: async function (defaultPathMap) {
    return Object.fromEntries(
      Object.entries(defaultPathMap).filter(
        ([path]) => !path.includes('/404') && !path.includes('/500')
      )
    );
  },
};

module.exports = cloudflareConfig; 