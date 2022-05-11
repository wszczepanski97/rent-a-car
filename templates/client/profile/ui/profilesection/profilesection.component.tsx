import { ProfilePageProps } from "pages/client/profile";
import { FC } from "react";
import { ProfileSectionModeProvider } from "./profilesectionmode.context";
import { ProfileSectionCard } from "./templates";

const ProfileSection: FC<ProfilePageProps> = ({ user }) => (
  <ProfileSectionModeProvider>
    <section id="profileSection">
      <ProfileSectionCard user={user} />
    </section>
  </ProfileSectionModeProvider>
);

export default ProfileSection;
