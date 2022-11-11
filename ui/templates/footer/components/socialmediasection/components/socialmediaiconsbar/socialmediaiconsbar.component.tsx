import type { FC } from "react";
import SocialMediaIcon from "./components/socialmediaicon";
import styles from "./socialmediaiconsbar.module.scss";

const SocialMediaIconsBar: FC = () => (
  <div className={styles.socialMediaIconsBar}>
    <SocialMediaIcon src="/images/FacebookIcon.svg" alt="Facebook icon" />
    <SocialMediaIcon src="/images/InstagramIcon.svg" alt="Instagram icon" />
    <SocialMediaIcon src="/images/TwitterIcon.svg" alt="Twitter icon" />
    <SocialMediaIcon src="/images/YoutubeIcon.svg" alt="Youtube icon" />
  </div>
);

export default SocialMediaIconsBar;
