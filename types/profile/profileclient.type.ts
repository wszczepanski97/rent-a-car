import type { klienci, uzytkownicy } from "@prisma/client";
import { UserRole } from "types/userrole/userrole.type";

export type ProfileClient = {
  type: UserRole.CLIENT;
  user: (klienci & uzytkownicy) | null;
};
