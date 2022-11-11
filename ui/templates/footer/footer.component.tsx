import { SidebarContext } from "contexts/sidebar.context";
import type { FC } from "react";
import { useContext } from "react";
import FooterLinkSection from "./components/footerlinksection";
import SocialMediaSection from "./components/socialmediasection";

const Footer: FC = () => {
  const { open } = useContext(SidebarContext);
  return (
    <footer style={open ? { width: "calc(100vw - 8px)" } : undefined}>
      <FooterLinkSection />
      <SocialMediaSection />
    </footer>
  );
};

export default Footer;
