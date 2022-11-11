import type { FC } from "react";
import ProfileSectionCard from "templates/common/profile/ui/profilesection/templates/profilesectioncard/profilesectioncard.component";
import {
  ProfileSectionProvider,
  ProfileSectionProviderProps,
} from "./profilesectionmode.context";

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
