//import { getServerSession } from "next-auth/next";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("middleware - middleware - middleware");
  try {
    console.log(request);
    // console.log("middleware - 1", process.env.SECRET);
    // console.log("Request URL:", request.nextUrl.href);
    // console.log("Request Headers:", request.headers);
    // console.log("All Cookies:", request.cookies);
    // console.log("Cookies:", request.cookies.get("next-auth.session-token"));
    const tokens = await getToken({
      req: request,
      secret: process.env.SECRET,
      raw: true, // JWT 토큰을 직접 처리
      cookieName: "next-auth.session-token",
    });
    // console.log("middleware - 2");
    console.log(tokens);
    // console.log("middleware - 3");
    // const ssss = await getServerSession(authOptions);
    // console.log(ssss);
  } catch (e) {
    console.log(e);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello");

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  response.headers.set("x-hello-from-middleware2", "hello");
  return response;
}

export const config = { matcher: ["/api-server/:path*"] };
