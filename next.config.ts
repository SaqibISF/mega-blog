import config from "@/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: 'build',

  // env: {
  //   NEXT_PUBLIC_APPWRITE_URL: process.env.NEXT_PUBLIC_APPWRITE_URL,
  //   NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  //   NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  //   NEXT_PUBLIC_APPWRITE_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
  //   NEXT_PUBLIC_APPWRITE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
  // },

  
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        port: '',
        // pathname: '/v1/storage/buckets/674c2bb20035a9eebdcf/files/**',
        pathname: `/v1/storage/buckets/${config.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/**`,
      },
    ],
  },
}

export default nextConfig;
