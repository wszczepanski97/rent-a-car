import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Error from "next/error";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        Login: { type: "text" },
        Hasło: { type: "password" },
        role: { type: "hidden" },
      },
      id: "credentials",
      name: "credentials",
      type: "credentials",
      async authorize(credentials, req) {
        try {
          const user = await prisma.uzytkownicy.findFirst({
            where: {
              Login: credentials?.Login,
              Haslo: credentials?.Hasło,
              role_uzytkownik: {
                every: {
                  role: {
                    Nazwa: credentials?.role,
                  },
                },
              },
            },
            select: {
              IdUzytkownicy: true,
              role_uzytkownik: {
                select: {
                  role: {
                    select: {
                      Nazwa: true,
                    },
                  },
                },
              },
            },
          });
          return (
            user &&
            ({
              id: user.IdUzytkownicy,
              role: user.role_uzytkownik[0].role.Nazwa,
            } as User)
          );
        } catch (e: any) {
          const errorMessage = e.message;
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
