import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { ProfileAdmin, ProfileSection, UserRole } from "templates";
import { prisma } from "../../../db";

type ProfileAdminPageProps = {
  profile: ProfileAdmin;
};

const ProfileAdminPage: NextPage<ProfileAdminPageProps> = ({ profile }) => (
  <ProfileSection profile={profile} />
);

const getUser: GetServerSideProps<ProfileAdminPageProps> = async (context) => {
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
    props: { profile: { user, type: UserRole.coordinator } },
  };
};

export const getServerSideProps = getUser;

export default ProfileAdminPage;
