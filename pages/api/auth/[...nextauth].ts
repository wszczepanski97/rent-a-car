import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, uzytkownicy } from "@prisma/client";
let userAccount: uzytkownicy | null = null;

const prisma = new PrismaClient();
const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.uzytkownicy.findFirst({
          where: {
            Login: credentials?.email,
            Haslo: credentials?.password,
          },
        });

        if (user !== null) {
          userAccount = user;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (typeof user.userId !== typeof undefined) {
        if (user.isActive === "1") {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    async session({ session, user, token }) {
      if (userAccount !== null) {
        session.user = userAccount;
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.userId === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};

const authenticate = (req, res) => NextAuth(req, res, configuration);
export default au;
