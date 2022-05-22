import { FC } from "react";
import { Photo } from "ui";
import styles from "./profilephotocolumnphoto.module.scss";

const ProfilePhotoColumnPhoto: FC = () => (
  <div className={styles.ProfilePhotoColumnPhoto}>
    <h3>Zdjęcie</h3>
    <Photo
      src="/images/Avatar.webp"
      alt="Avatar"
      size={{ height: "200", width: "200" }}
    />
  </div>
);

export default ProfilePhotoColumnPhoto;
