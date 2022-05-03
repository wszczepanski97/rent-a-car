import { PrismaClient } from "@prisma/client";
import { withExclude } from "prisma-exclude";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = withExclude(
  global.prisma ||
    new PrismaClient({
      log: ["query"],
    })
);

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
