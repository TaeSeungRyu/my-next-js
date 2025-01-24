import type { NextConfig } from "next";
const path = require("path");
const nextConfig: NextConfig = {
  // redirects: async () => {
  //   return [
  //     {
  //       source: "/mobile/:path*", // 이미 /mobile 경로에 있는 요청은 리다이렉션 제외
  //       destination: "/mobile/:path*", // 원래 경로로 유지
  //       permanent: false,
  //     },
  //     {
  //       source: "/:path*", // 모든 경로
  //       destination: "/mobile/:path*", // 모바일 디바이스는 /mobile 경로로 리다이렉트
  //       permanent: true,
  //       has: [
  //         {
  //           type: "header",
  //           key: "User-Agent",
  //           value: "(.*Mobil.*)", // User-Agent에 'Mobil' 포함 시
  //         },
  //       ],
  //     },
  //   ];
  // },
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
