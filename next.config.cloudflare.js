/** @type {import('next').NextConfig} */
const nextConfigCloudflare = {
  // Use static export for Cloudflare Pages with @cloudflare/next-on-pages
  output: 'export',
  
  // Image optimization must be disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Basic configuration options
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Skip TypeScript and ESLint checks during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Skip certain error pages from static generation
  // We'll use our custom static HTML pages instead
  skipTrailingSlashRedirect: true,
  
  // Use environment variable to determine if we're running in Cloudflare Pages
  env: {
    IS_CLOUDFLARE_PAGES: 'true',
  },
};

module.exports = nextConfigCloudflare; 