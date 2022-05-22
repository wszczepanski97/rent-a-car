import { FC } from "react";
import {
  ProfileSectionMode,
  useProfileSectionContext,
} from "templates/common/profile/ui/profilesection/profilesectionmode.context";
import {
  BackToDashboardButton,
  DeleteUserButton,
  ProfilePhotoColumnPhoto,
} from "./molecules";
import styles from "./profilephotocolumn.module.scss";

const ProfilePhotoColumn: FC = () => {
  const { mode } = useProfileSectionContext();
  return (
    <div className={styles.ProfilePhotoColumnContainer}>
      <ProfilePhotoColumnPhoto />
      {mode === ProfileSectionMode.DEFAULT ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DeleteUserButton />
          <BackToDashboardButton />
        </div>
      ) : undefined}
    </div>
  );
};

export default ProfilePhotoColumn;
