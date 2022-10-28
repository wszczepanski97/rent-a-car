import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import { FooterLinkSection, SocialMediaSection } from "./organisms";

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
