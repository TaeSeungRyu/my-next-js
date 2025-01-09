import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SECRET: process.env.SECRET,
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
};

export default nextConfig;
