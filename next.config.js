/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir - it's deprecated in Next.js 14
  // experimental: {
  //   appDir: true,
  // },
  
  images: {
    domains: [
      'localhost',
      'via.placeholder.com',
      'images.unsplash.com',
      'res.cloudinary.com',
    ],
  },
  
  // Add fallback values to prevent undefined environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID || '',
    NEXT_PUBLIC_OPENCAGE_API_KEY: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || '',
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/:path*`,
      },
    ];
  },
  
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard/admin',
        permanent: true,
      },
      {
        source: '/business',
        destination: '/dashboard/business',
        permanent: true,
      },
    ];
  },
  
  webpack: (config, { dev, isServer }) => {
    // Fix for 'fs' module error in client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // TypeScript configuration
  typescript: {
    // Set to true to ignore type errors during build
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration
  eslint: {
    // Set to true only if you want to ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;