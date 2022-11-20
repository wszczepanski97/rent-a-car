import SlideAnimation from "animations/slideanimation";
import { CarContext } from "contexts/car.context";
import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import { NextPageWithLayout } from "types/next";
import CarsCardSection from "./components/carscardsection";
import { PricingPageProps } from "./pricing.props";

const PricingPage: NextPageWithLayout<PricingPageProps> = ({ cars }) => (
  <>
    <Head>
      <title>Wyszukaj auto</title>
    </Head>
    <CarContext.Provider value={cars}>
      <SlideAnimation>
        <CarsCardSection />
      </SlideAnimation>
    </CarContext.Provider>
  </>
);

PricingPage.getLayout = WithoutFooterLayout;

export default PricingPage;
