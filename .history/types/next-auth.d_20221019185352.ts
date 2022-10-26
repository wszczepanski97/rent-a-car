import NextAuth from "next-auth";
import { UserRole } from "../templates";
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: UserRole;
    };
  }
}
