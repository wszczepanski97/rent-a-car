import { FC } from "react";
import styles from "./footer.module.scss";
import { FooterLinkSection, SocialMediaSection } from "./organisms";

const Footer: FC = () => (
  <footer className={styles}>
    <FooterLinkSection />
    <SocialMediaSection />
  </footer>
);

export default Footer;
