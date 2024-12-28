/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      duration: 30,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
