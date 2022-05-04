import NextAuth from "next-auth";
import { UserRole } from "../templates/common/login";
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: UserRole;
    };
  }
}
