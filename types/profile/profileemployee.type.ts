import type { pracownicy, uzytkownicy } from "@prisma/client";
import { UserRole } from "types/userrole/userrole.type";

export type ProfileEmployee = {
  type:
    | UserRole.COORDINATOR
    | UserRole.CLEANER
    | UserRole.DRIVER
    | UserRole.MECHANIC;
  user: (pracownicy & uzytkownicy) | null;
};
