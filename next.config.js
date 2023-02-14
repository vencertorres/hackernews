/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/top?p=1',
      },
    ]
  },
}

module.exports = nextConfig
