/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://shop-laptop-server.vercel.app/api/:slug*',
      },
    ]
  },
}

module.exports = nextConfig
