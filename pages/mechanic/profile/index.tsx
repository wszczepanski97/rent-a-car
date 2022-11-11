import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { ProfileSection } from "templates";
import { ProfileEmployee } from "templates/common/types";
import { UserRole } from "ui";
import { prisma } from "../../../db";

type ProfileMechanicPageProps = {
  profile: ProfileEmployee;
};

const ProfileMechanicPage: NextPage<ProfileMechanicPageProps> = ({
  profile,
}) => <ProfileSection profile={profile} />;

const getUser: GetServerSideProps<ProfileMechanicPageProps> = async (
  context
) => {
  const session = await getSession(context);
  const foundedUser = await prisma.pracownicy.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
    },
    include: {
      uzytkownicy: true,
    },
  });
  const { uzytkownicy, ...userDetails } = foundedUser!;
  const user = { ...userDetails, ...uzytkownicy };
  return {
    props: { profile: { user, type: UserRole.MECHANIC } },
  };
};

export const getServerSideProps = getUser;

export default ProfileMechanicPage;
