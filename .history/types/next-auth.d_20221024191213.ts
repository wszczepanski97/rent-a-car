import "next-auth";
import { UserRole } from "../templates";
declare module "next-auth" {
  interface User {
    
    id: number;
    role: UserRole;
  }
  }
  interface Session {
    user: {
      id: number;
      role: UserRole;
    };
  }
}
