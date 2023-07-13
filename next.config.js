/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.freeimages.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
