import { getToken, decode } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  //이 곳에서 저장된 키 값을 헤더에 넣어서 API 서버로 전달
  try {
    const tokens = await getToken({
      req: request,
      secret: process.env.SECRET,
      raw: true, // JWT 토큰을 직접 처리
      cookieName: "next-auth.session-token",
    });
    const savedValue = await decode({
      token: tokens,
      secret: process.env.SECRET || "",
    });
    console.log(savedValue);
  } catch (e) {
    console.log(e);
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello"); //여기에 Auth같은 헤더 추가
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("x-hello-from-middleware2", "hello"); //응답 헤더 변경 가능
  return response;
}

//TODO : withAuth 미들웨어를 사용하여 인증된 사용자만 접근 가능하도록 설정 페이지 해 보기!
import { withAuth } from "next-auth/middleware";
export default withAuth(
  function middleware(req) {
    console.log("asdf");
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  }
);

export const config = { matcher: ["/api-server/:path*", "/sample"] };
