/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output as it's not needed for Vercel
  // output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // Remove the unoptimized flag to ensure proper image optimization on the server
    // unoptimized: process.env.NODE_ENV === 'development',
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
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "img-src 'self' https://*.dicebear.com https://*.unsplash.com https://*.placehold.co data: blob: *",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "connect-src 'self' https://*.dicebear.com https://*.unsplash.com https://*.placehold.co",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },

  // Ensure server-side rendering is enabled
  // experimental: {
  //   appDir: true,
  // },

  // Explicitly set webpack config to help resolve modules
  webpack: (config) => {
    // Add aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    
    return config;
  },
};

module.exports = nextConfig;
