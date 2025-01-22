import type { NextConfig } from "next";
const path = require("path");
const nextConfig: NextConfig = {
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    API_SERVER_UR: process.env.API_SERVER_URL,
    TEST_ID: process.env.TEST_ID,
    TEST_PASSWORD: process.env.TEST_PASSWORD,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    FIRE_BASE_APIKEY: process.env.FIRE_BASE_APIKEY,
    FIRE_BASE_AUTHDOMAIN: process.env.FIRE_BASE_AUTHDOMAIN,
    FIRE_BASE_PROJECTID: process.env.FIRE_BASE_PROJECTID,
    FIRE_BASE_STORAGEBUCKET: process.env.FIRE_BASE_STORAGEBUCKET,
    FIRE_BASE_MESSAGINGSENDERID: process.env.FIRE_BASE_MESSAGINGSENDERID,
    FIRE_BASE_APPID: process.env.FIRE_BASE_APPID,
    FIRE_BASE_MEASUREMENTID: process.env.FIRE_BASE_MEASUREMENTID,
  },
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
        search: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api-server/:path*", //들어오는 요청 경로 패턴
        destination: `${process.env?.API_SERVER_URL}/:path*` || "", //라우팅하려는 경로
      },
    ];
  },

  output: "standalone",
};

export default nextConfig;
