import type { FC } from "react";
import { useProfileContext } from "templates/common/profile/context/profile.context.hook";
import { ProfileMode } from "templates/common/profile/context/profile.context.type";
import BackToDashboardButton from "./components/backtodashboardbutton/backtodashboardbutton.component";
import DeleteUserButton from "./components/deleteuserbutton/deleteuserbutton.component";
import ProfilePhotoColumnPhoto from "./components/profilephotocolumnphoto/profilephotocolumnphoto.component";
import styles from "./profilephotocolumn.module.scss";

const ProfilePhotoColumn: FC = () => {
  const { mode } = useProfileContext();
  return (
    <div className={styles.profilePhotoColumnContainer}>
      <ProfilePhotoColumnPhoto />
      {mode === ProfileMode.DEFAULT ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DeleteUserButton />
          <BackToDashboardButton />
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePhotoColumn;
