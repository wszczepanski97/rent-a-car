import type { NextPage } from "next";
import {
  Header,
  ServicesSection,
  SolutionsSection,
  StatsSection,
} from "templates/common";
import { ContactSection } from "ui/common";

const HomePage: NextPage = () => (
  <>
    <Header />
    <StatsSection />
    <SolutionsSection />
    <ServicesSection />
    <ContactSection />
  </>
);

export default HomePage;
