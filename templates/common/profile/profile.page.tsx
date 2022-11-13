import type { NextPage } from "next";
import { ProfilePageProps } from "templates/common/profile/profile.props";
import ProfileSection from "./components/profilesection/profilesection.component";

const ProfilePage: NextPage<ProfilePageProps> = ({ profile }) => (
  <ProfileSection profile={profile} />
);

export default ProfilePage;
