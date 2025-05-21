import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MAX_SESSION_HOUR } from "@/lib/enum/ApplicationConstants";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { verifyUserSignIn } from "@/lib/services/AuthService";

export const authOptions = () => ({
  session: {
    strategy: "jwt",
    maxAge: MAX_SESSION_HOUR * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        return verifyUserSignIn(credentials);
      },
    }),
  ],
  pages: {
    signIn: appRouteList.login,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token = user;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
});

const api = NextAuth(authOptions());

export { api as GET, api as POST };
