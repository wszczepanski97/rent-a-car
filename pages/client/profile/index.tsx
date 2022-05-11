import { klienci } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import ProfileSection from "templates/client/profile/ui/profilesection/profilesection.component";
import { prisma } from "../../../db";

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  return <ProfileSection user={user} />;
};

const getUser: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const user = await prisma.klienci.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
    },
  });
  return {
    props: {
      user,
    },
  };
};

export type ProfilePageProps = {
  user: klienci;
};

export const getServerSideProps = getUser;

export default ProfilePage;
