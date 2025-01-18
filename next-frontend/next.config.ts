/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Proxy API endpoint
        destination: "http://yourilee.42web.io/wp-json/wp/v2/:path*", // Backend server
      },
    ];
  },
};

module.exports = nextConfig;
