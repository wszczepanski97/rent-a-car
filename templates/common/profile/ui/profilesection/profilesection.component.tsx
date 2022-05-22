import { FC } from "react";
import {
  ProfileSectionProvider,
  ProfileSectionProviderProps,
} from "./profilesectionmode.context";
import { ProfileSectionCard } from "./templates";

const ProfileSection: FC<ProfileSectionProviderProps> = ({ profile }) => {
  return (
    <ProfileSectionProvider profile={profile}>
      <section id="profileSection">
        <ProfileSectionCard />
      </section>
    </ProfileSectionProvider>
  );
};

export default ProfileSection;
