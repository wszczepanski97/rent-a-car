import { klienci, pracownicy, uzytkownicy } from "@prisma/client";
import { prisma } from "db";
import { unstable_getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { ProfilePageProps } from "templates/common/profile/profile.props";
import { UserRole } from "types/userrole/userrole.type";

export const profileServerSideProps: GetServerSideProps<
  ProfilePageProps
> = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  let foundUser:
    | (klienci & { uzytkownicy: uzytkownicy })
    | (pracownicy & { uzytkownicy: uzytkownicy })
    | null;
  if (!session) return { props: { profile: null } };
  if (session?.user.role === UserRole.CLIENT) {
    foundUser = await prisma.klienci.findFirst({
      where: {
        IdUzytkownicy: session?.user.id,
      },
      include: {
        uzytkownicy: true,
      },
    });
    const { uzytkownicy, ...userDetails } = foundUser!;
    const user = { ...userDetails, ...uzytkownicy };
    return {
      props: { profile: { user, type: session?.user.role } },
    };
  } else {
    foundUser = await prisma.pracownicy.findFirst({
      where: {
        IdUzytkownicy: session?.user.id,
      },
      include: {
        uzytkownicy: true,
      },
    });
    const { uzytkownicy, ...userDetails } = foundUser!;
    const user = { ...userDetails, ...uzytkownicy };
    return {
      props: { profile: { user, type: session?.user.role } },
    };
  }
};
