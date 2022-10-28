import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import styles from "./socialmediasection.module.scss";
import { CopyrightHeader, SocialMediaIconsBar } from "./ui";

const SocialMediaSection: FC = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section style={open ? { marginLeft: "21rem" } : undefined}>
      <div className={styles.socialMediaSection}>
        <CopyrightHeader />
        <SocialMediaIconsBar />
      </div>
    </section>
  );
};

export default SocialMediaSection;
