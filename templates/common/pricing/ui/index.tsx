import SlideAnimation from "animations/slide.animation";
import { SidebarContextProvider } from "contexts/sidebar-context";
import { ReactElement } from "react";
import { Cars } from "templates/common/types";
import { NextPageWithLayout } from "types/next";
import { ContactSection, Footer, Main, Navbar, Sidebar } from "ui";
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
  <SidebarContextProvider>
    <Main>
      <Sidebar />
      <Navbar />
      {page}
      <Footer />
    </Main>
  </SidebarContextProvider>
);

export default PricingPage;
