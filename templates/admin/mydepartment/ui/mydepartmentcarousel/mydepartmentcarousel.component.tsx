import * as React from "react";
import Carousel from "re-carousel";
import Buttons from "./buttons.component";
import KeyboardNavigator from "./keyboardnavigator.component";
import NavigationMenu from "./navigationmenu.component";

const MyDepartmentCarousel: React.FC = ({ children }) => (
  <div id="myDepartmentCarousel" style={{ height: "100%", width: "100%" }}>
    <Carousel widgets={[Buttons, KeyboardNavigator, NavigationMenu]}>
      {children}
    </Carousel>
  </div>
);

export default MyDepartmentCarousel;
