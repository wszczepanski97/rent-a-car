import { FC } from "react";
import styles from "./socialmediasection.module.scss";
import { CopyrightHeader, SocialMediaIconsBar } from "./ui";

const SocialMediaSection: FC = () => (
  <section
  style={active ? { marginLeft: "21rem" } : undefined}
>
  <div className={styles.socialMediaSection}>
    <CopyrightHeader />
    <SocialMediaIconsBar />
  </div>
);

export default SocialMediaSection;
