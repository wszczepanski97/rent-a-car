import * as React from "react";
import Carousel from "re-carousel";
import Buttons from "./buttons.component";
import KeyboardNavigator from "./keyboardnavigator.component";
import IndicatorDots from "./indicatordots.component";

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
