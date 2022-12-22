/** @type {import('next').NextConfig} */
const nextConfig = {

  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://finlife.fss.or.kr/:path*',
      },
    ];
  },
}

module.exports = nextConfig
