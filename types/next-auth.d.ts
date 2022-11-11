import "next-auth";
import { UserRole } from "types/userrole/userrole.type";
declare module "next-auth" {
  interface User {
    id: number;
    role: UserRole;
  }
  interface Session {
    user: User;
  }
}
