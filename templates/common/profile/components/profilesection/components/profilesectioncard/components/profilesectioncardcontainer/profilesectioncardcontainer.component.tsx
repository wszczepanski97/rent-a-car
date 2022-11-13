import type { FC } from "react";
import styles from "./profilesectioncardcontainer.module.scss";

const ProfileSectionCardContainer: FC = ({ children }) => (
  <div className={styles.profileSectionCardContainer}>{children}</div>
);

export default ProfileSectionCardContainer;
