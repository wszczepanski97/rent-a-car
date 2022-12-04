import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import { ProfilePageProps } from "templates/common/profile/profile.props";
import { NextPageWithLayout } from "types/next";
import ProfileSection from "./components/profilesection/profilesection.component";

const ProfilePage: NextPageWithLayout<ProfilePageProps> = ({ profile }) => (
  <>
    <Head>
      <title>Profil</title>
    </Head>
    <ProfileSection profile={profile} />
  </>
);

ProfilePage.getLayout = WithoutFooterLayout;

export default ProfilePage;
