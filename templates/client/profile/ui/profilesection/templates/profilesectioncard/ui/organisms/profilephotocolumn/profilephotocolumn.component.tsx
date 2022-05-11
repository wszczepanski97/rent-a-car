import { FC } from "react";
import {
  ProfileSectionMode,
  useProfileSectionModeContext,
} from "templates/client/profile/ui/profilesection/profilesectionmode.context";
import {
  BackToDashboardButton,
  DeleteUserButton,
  ProfilePhotoColumnPhoto,
} from "./molecules";
import styles from "./profilephotocolumn.module.scss";

export type ProfilePhotoColumnProps = {
  profile: {
    clientId: number;
    userId: number;
  };
};

const ProfilePhotoColumn: FC<ProfilePhotoColumnProps> = ({ profile }) => {
  const { mode } = useProfileSectionModeContext();
  return (
    <div className={styles.ProfilePhotoColumnContainer}>
      <ProfilePhotoColumnPhoto />
      {mode === ProfileSectionMode.DEFAULT ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DeleteUserButton profile={profile} />
          <BackToDashboardButton />
        </div>
      ) : undefined}
    </div>
  );
};

export default ProfilePhotoColumn;
