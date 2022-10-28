import SlideAnimation from "animations/slide.animation";
import { FC } from "react";
import { HeaderSection } from "templates/common/home/ui/header/ui";
const Header: FC = () => (
  <SlideAnimation>
    <HeaderSection />
  </SlideAnimation>
);

export default Header;
