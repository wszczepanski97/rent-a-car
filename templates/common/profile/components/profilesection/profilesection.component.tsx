import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import { ProfileContextProvider } from "../../context/profile.context.provider";
import { ProfileContextProviderProps } from "../../context/profile.context.provider.props";
import ProfileSectionCard from "./components/profilesectioncard/profilesectioncard.component";

const ProfileSection: FC<ProfileContextProviderProps> = ({ profile }) => {
  const { open } = useContext(SidebarContext);
  return (
    <ProfileContextProvider profile={profile}>
      <section
        style={{
          height: open ? "100vh" : "calc(100vh - var(--navbar-height))",
          display: "flex",
          justifyContent: "center",
          alignItems: open ? "center" : "inherit",
          paddingTop: open ? 50 : 0,
          width: "100%",
        }}
      >
        <ProfileSectionCard />
      </section>
    </ProfileContextProvider>
  );
};

export default ProfileSection;
