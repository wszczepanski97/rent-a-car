import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { ProfileSection, UserRole } from "templates";
import { ProfileEmployee } from "templates/common/types";
import { prisma } from "../../../db";

type ProfileDriverPageProps = {
  profile: ProfileEmployee;
};

const ProfileDriverPage: NextPage<ProfileDriverPageProps> = ({ profile }) => (
  <ProfileSection profile={profile} />
);

const getUser: GetServerSideProps<ProfileDriverPageProps> = async (context) => {
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
    props: { profile: { user, type: UserRole.DRIVER } },
  };
};

export const getServerSideProps = getUser;

export default ProfileDriverPage;
