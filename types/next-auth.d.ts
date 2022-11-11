import "next-auth";
import { UserRole } from "../ui";
declare module "next-auth" {
  interface User {
    id: number;
    role: UserRole;
  }
  interface Session {
    user: User;
  }
}
