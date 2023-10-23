/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/top/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
