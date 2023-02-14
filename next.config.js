/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/news?p=1',
      },
    ]
  },
}

module.exports = nextConfig
