import { lokalizacje, role } from "@prisma/client";

export type RegisterPageProps = {
  allJobRoles: role[];
  allLocations: lokalizacje[];
};
