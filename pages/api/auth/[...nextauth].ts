import NextAuth, { CallbacksOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Provider } from "next-auth/providers";

const prisma = new PrismaClient();

const providers: Provider[] = [
  CredentialsProvider({
    credentials: {
      name: { type: "text" },
      password: { type: "password" },
    },
    type: "credentials",
    async authorize(credentials) {
      try {
        const user = await prisma.uzytkownicy.findFirst({
          where: {
            Login: credentials?.name,
            Haslo: credentials?.password,
          },
        });
        if (user !== null) {
          return user;
        } else {
          return null;
        }
      } catch (e) {
        //@ts-ignore
        const errorMessage = e.message;
        throw new Error(errorMessage);
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  async redirect({ url, baseUrl }) {
    if (url.startsWith("/")) return new URL(url, baseUrl).toString();
    else if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },
};

const authenticate = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
export default authenticate;
