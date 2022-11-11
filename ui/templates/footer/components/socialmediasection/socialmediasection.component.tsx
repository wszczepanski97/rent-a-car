import { SidebarContext } from "contexts/sidebar.context";
import type { FC } from "react";
import { useContext } from "react";
import CopyrightHeader from "./components/copyrightheader";
import SocialMediaIconsBar from "./components/socialmediaiconsbar";
import styles from "./socialmediasection.module.scss";

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
