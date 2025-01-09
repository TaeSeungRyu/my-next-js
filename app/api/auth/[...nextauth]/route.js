import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // OAuth 인증 생플
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // 로그인 페이지에서 사용자 이름과 비밀번호를 입력하여 로그인하는 방법을 제공.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      //요청 샘플 입니다.
      async authorize(credentials, req) {
        const loginUrl = `${req.headers["origin"]}/api-server/login`; //fetch는 full url을 요구 합니다.
        const params = {
          adminUsername: "fi000001",
          adminPassword: "admin1234!",
        };
        const res = await fetch(loginUrl, {
          //API 서버에 로그인 요청
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...req.headers,
          },
          credentials: "include",
          body: JSON.stringify(params),
        }).catch((e) => e);
        try {
          if (res.status === 200) {
            await res.json(); //API 서버에서 받은 데이터를 사용자 정보
            //console.log(data);
          }
        } catch (e) {
          console.log(e);
        }
        return {
          id: 1,
          name: "testName",
          email: "test@a.com",
          role: ["aaaa", "bbbb", "cccc", "dddd", "eeee"].join(","), //사용자 정의 필드 추가
        }; //사용자 정보를 리턴, 원하는 방법으로 가공
      },
    }),
  ],
};

const handler = NextAuth({
  secret: process.env.SECRET,
  credentials: "include",
  session: {
    jwt: true,
    strategy: "jwt",
    secureCookie: process.env.NODE_ENV === "production",
  },
  jwt: {
    encryption: true, // JWT 암호화 활성화
  },
  debug: true,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax", // 개발 환경에서는 lax로 설정
        path: "/",
        secure: false,
      },
    },
  },
  providers: authOptions.providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role; //사용자 정의 필드 추가
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) session.user.role = token.role; //사용자 정의 필드 추가
      return session;
    },
  },
});
export { handler as GET, handler as POST };
