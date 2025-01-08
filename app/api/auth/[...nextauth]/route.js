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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: 1, name: "testName", email: "test@a.com" };
        console.log("credentials values : ", credentials);
        return user;
      },
    }),
  ],
};

const handler = NextAuth({
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    encryption: true, // JWT 암호화 활성화
  },
  debug: true,
  providers: authOptions.providers,
  callbacks: {
    async jwt({ token, account }) {
      console.log("access to jwt : ", token, account);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("access to session : ", session, token, user);
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
