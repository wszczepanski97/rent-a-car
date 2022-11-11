import SlideAnimation from "animations/slideanimation";
import { CarContext } from "contexts/car.context";
import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import { NextPageWithLayout } from "types/next";
import CarsCardSection from "./components/carscardsection";
import { PricingPageProps } from "./pricing.props";

const PricingPage: NextPageWithLayout<PricingPageProps> = ({ cars }) => (
  <CarContext.Provider value={cars}>
    <SlideAnimation>
      <CarsCardSection />
    </SlideAnimation>
  </CarContext.Provider>
);

PricingPage.getLayout = WithoutFooterLayout;

export default PricingPage;
