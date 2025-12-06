//https://nextjs.org/docs/messages/next-image-unconfigured-host
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  //res.cloudinary.com
};

export default nextConfig;
