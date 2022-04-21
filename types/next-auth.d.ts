import NextAuth from "next-auth";

export type UserRole =
  | "ADMIN"
  | "MYJKOWY"
  | "TECHNICZNY"
  | "KOORDYNATOR"
  | "KLIENT";
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: Role;
    };
  }
}
