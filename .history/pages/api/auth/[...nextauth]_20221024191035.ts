import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user = token.user;
      console.log(token.user);
      console.log(user);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        name: { type: "text" },
        password: { type: "password" },
        role: { type: "hidden" },
      },
      id: "credentials",
      name: "credentials",
      type: "credentials",
      async authorize(credentials) {
        try {
          const user = await prisma.uzytkownicy.findFirst({
            where: {
              Login: credentials?.name,
              Haslo: credentials?.password,
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
            user && {
              id: user.IdUzytkownicy,
              role: user.role_uzytkownik[0].role.Nazwa,
            }
          );
        } catch (e) {
          //@ts-ignore
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
});
