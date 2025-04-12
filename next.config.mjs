/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      duration: 30,
    },
    serverActions: {
      bodySizeLimit: "1mb", // Збільш ліміт до 10 МБ (налаштуй за потребою)
    },
  },

  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "127.0.0.1",
  //       port: "1337", // Додай порт
  //       pathname: "/uploads/**", // Шлях до зображень
  //     },
  //   ],
  // },

  serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
