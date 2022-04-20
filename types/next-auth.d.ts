import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: "ADMIN" | "MYJKOWY" | "TECHNICZNY" | "KOORDYNATOR" | "KLIENT";
    };
  }
}
