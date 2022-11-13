import type { FC } from "react";
import { ProfileContextProvider } from "../../context/profile.context.provider";
import { ProfileContextProviderProps } from "../../context/profile.context.provider.props";
import ProfileSectionCard from "./components/profilesectioncard/profilesectioncard.component";

const ProfileSection: FC<ProfileContextProviderProps> = ({ profile }) => (
  <ProfileContextProvider profile={profile}>
    <section id="profileSection">
      <ProfileSectionCard />
    </section>
  </ProfileContextProvider>
);

export default ProfileSection;
