import SlideAnimation from "animations/slide.animation";
import { NextPage } from "next";
import { LoginSection } from "templates/common";

const LoginPage: NextPage = () => (
  <SlideAnimation>
    <LoginSection />
  </SlideAnimation>
);
export default LoginPage;
