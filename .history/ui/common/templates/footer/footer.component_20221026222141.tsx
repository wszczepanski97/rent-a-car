import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import { FooterLinkSection, SocialMediaSection } from "./organisms";

const Footer: FC = () => {
  const { active } = useContext(SidebarContext);
  return (
    <footer style={{}}>
      <FooterLinkSection />
      <SocialMediaSection />
    </footer>
  );
};

export default Footer;
