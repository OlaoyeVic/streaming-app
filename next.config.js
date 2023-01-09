/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'image.tmdb.org'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
  // experimental: {
  //   // This is experimental but can
  //   // be enabled to allow parallel threads
  //   // with nextjs automatic static generation
  //   workerThreads: false,
  //   cpus: 1
  // },
}

module.exports = nextConfig
