import { SidebarContext } from "contexts/sidebar.context";
import Carousel from "re-carousel";
import * as React from "react";
import IndicatorDots from "./indicatordots.component";
import KeyboardNavigator from "./keyboardnavigator.component";

const MyDepartmentCarousel: React.FC = ({ children }) => {
  const { open } = React.useContext(SidebarContext);
  return (
    <div
      id="myDepartmentCarousel"
      style={{
        height: open ? "100vh" : "calc(100vh - var(--navbar-height)",
        width: "100%",
      }}
    >
      <Carousel widgets={[KeyboardNavigator, IndicatorDots]} duration={150}>
        {children}
      </Carousel>
    </div>
  );
};

export default MyDepartmentCarousel;
