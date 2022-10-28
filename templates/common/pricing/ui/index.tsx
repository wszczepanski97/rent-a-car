import SlideAnimation from "animations/slide.animation";
import { ReactElement } from "react";
import { Cars } from "templates/common/types";
import { NextPageWithLayout } from "types/next";
import { ContactSection, Footer, Navbar } from "ui";
import { PricingPageContext } from "../contexts";
import CarsCardSection from "./carscardsection/carscardsection.component";

type PricingPageProps = {
  cars: Cars[];
};

const PricingPage: NextPageWithLayout<PricingPageProps> = ({ cars }) => (
  <PricingPageContext.Provider value={cars}>
    <SlideAnimation>
      <CarsCardSection />
      <ContactSection />
    </SlideAnimation>
  </PricingPageContext.Provider>
);

PricingPage.getLayout = (page: ReactElement) => (
  <>
    <Navbar />
    {page}
    <Footer />
  </>
);

export default PricingPage;
