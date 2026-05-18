/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bio-theology/db", "@bio-theology/agents"],
};

module.exports = nextConfig;
