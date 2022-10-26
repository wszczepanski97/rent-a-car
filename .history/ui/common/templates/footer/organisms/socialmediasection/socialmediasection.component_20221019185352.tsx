import { FC } from "react";
import { CopyrightHeader, SocialMediaIconsBar } from "./ui";
import styles from "./socialmediasection.module.scss";

const SocialMediaSection: FC = () => (
  <div className={styles.socialMediaSection}>
    <CopyrightHeader />
    <SocialMediaIconsBar />
  </div>
);

export default SocialMediaSection;
