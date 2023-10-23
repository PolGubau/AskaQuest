/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["avatars.githubusercontent.com", "api.multiavatar.com"],
    formats: ["image/webp"],
  },
};
