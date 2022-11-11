import { prisma } from "db";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import ProfileSection from "templates/common/profile/ui/profilesection/profilesection.component";
import { ProfileEmployee } from "types/profile/profileemployee.type";
import { UserRole } from "types/userrole/userrole.type";

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
