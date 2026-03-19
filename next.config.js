/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'picsum.photos', 'api.dicebear.com'],
  },
  env: {
    MOCK_DB: process.env.MOCK_DB || 'true',
  },
  // Force all pages to be dynamic
  output: 'standalone',
};

module.exports = nextConfig;
