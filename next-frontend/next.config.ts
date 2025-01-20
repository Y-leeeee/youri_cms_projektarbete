/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"], // Add Contentful's CDN domain here
  },
};

module.exports = nextConfig;
