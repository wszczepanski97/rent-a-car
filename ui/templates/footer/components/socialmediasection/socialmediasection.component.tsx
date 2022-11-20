import type { FC } from "react";
import CopyrightHeader from "./components/copyrightheader";
import SocialMediaIconsBar from "./components/socialmediaiconsbar";
import styles from "./socialmediasection.module.scss";

const SocialMediaSection: FC = () => (
  <section>
    <div className={styles.socialMediaSection}>
      <CopyrightHeader />
      <SocialMediaIconsBar />
    </div>
  </section>
);

export default SocialMediaSection;
