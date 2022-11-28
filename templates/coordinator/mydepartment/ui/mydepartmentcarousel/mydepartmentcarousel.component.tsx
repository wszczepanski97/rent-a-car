import Carousel from "re-carousel";
import * as React from "react";
import Buttons from "./buttons.component";
import IndicatorDots from "./indicatordots.component";
import KeyboardNavigator from "./keyboardnavigator.component";

const MyDepartmentCarousel: React.FC = ({ children }) => (
  <div id="myDepartmentCarousel" style={{ height: "100%", width: "100%" }}>
    <Carousel
      widgets={[Buttons, KeyboardNavigator, IndicatorDots]}
      duration={150}
    >
      {children}
    </Carousel>
  </div>
);

export default MyDepartmentCarousel;
