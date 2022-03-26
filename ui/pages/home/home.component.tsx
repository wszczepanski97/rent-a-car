import type { NextPage } from "next";
import {
  Header,
  StatsSection,
  SolutionsSection,
  ServicesSection,
  ContactSection,
} from "./templates";

const Home: NextPage = () => (
  <>
    <Header />
    <StatsSection />
    <SolutionsSection />
    <ServicesSection />
    <ContactSection />
  </>
);

export default Home;
