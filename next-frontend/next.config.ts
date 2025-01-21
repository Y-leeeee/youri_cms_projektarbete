const nextConfig = {
  reactStrictMode: true, // Keep this for debugging
  images: {
    domains: ["images.ctfassets.net"], // Keep your required image domains
  },
  env: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  },
};

export default nextConfig;
