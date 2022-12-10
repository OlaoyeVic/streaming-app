/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ['lh3.googleusercontent.com'],
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
}

module.exports = nextConfig
