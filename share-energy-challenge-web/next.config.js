/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/loginPage",
        permanent: false,
      },
      {
        source: "/_error",
        destination: "/loginPage",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
