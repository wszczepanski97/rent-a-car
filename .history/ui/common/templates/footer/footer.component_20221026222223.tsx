import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import { FooterLinkSection, SocialMediaSection } from "./organisms";

const Footer: FC = () => {
  const { active } = useContext(SidebarContext);
  return (
    <footer style={active ? {{margin: '0 auto 0 10rem';
      width: '100vw'}}: undefined}>
      <FooterLinkSection />
      <SocialMediaSection />
    </footer>
  );
};

export default Footer;
