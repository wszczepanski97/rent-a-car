import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import { FooterLinkSection, SocialMediaSection } from "./organisms";

const Footer: FC = () => {
  const { active } = useContext(SidebarContext);
  return (
    <footer style={active ? { width: "calc(100vw - 8px)" } : undefined}>
      <FooterLinkSection />
      <SocialMediaSection />
    </footer>
  );
};

export default Footer;
