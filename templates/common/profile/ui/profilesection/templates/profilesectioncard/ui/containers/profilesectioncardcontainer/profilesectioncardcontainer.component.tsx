import type { FC } from "react";
import styles from "./profilesectioncardcontainer.module.scss";

const ProfileSectionCardContainer: FC = ({ children }) => (
  <div className={styles.ProfileSectionCardContainer}>{children}</div>
);

export default ProfileSectionCardContainer;
