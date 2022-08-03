import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { ProfileSection, UserRole } from "templates";
import { ProfileClient } from "templates/common/types";
import { prisma } from "../../../db";

type ProfilClientPageProps = {
  profile: ProfileClient;
};

const ProfileClientPage: NextPage<ProfilClientPageProps> = ({ profile }) => (
  <ProfileSection profile={profile} />
);

const getUser: GetServerSideProps<ProfilClientPageProps> = async (context) => {
  const session = await getSession(context);
  const foundedUser = await prisma.klienci.findFirst({
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
    props: { profile: { user, type: UserRole.CLIENT } },
  };
};

export const getServerSideProps = getUser;

export default ProfileClientPage;
