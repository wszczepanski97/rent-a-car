import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";
import { FC } from "react";
import AvailableServicesGridCard from "./cards/availableservicegridcard";
import CurrentServiceGridCard from "./cards/currentservicegridcard";
import FutureServicesGridCard from "./cards/futureservicesgridcard";
import PastServicesGridCard from "./cards/pastservicesgridcard";
import PaycheckGridCard from "./cards/paychecksgridcard";
import ServicesGridContainer from "./components/servicesgridcontainer";
import ServicesGridLayout from "./components/servicesgridlayout";
import ServicesGridTitle from "./components/servicesgridtitle";

export const ServicesGrid: FC = () => (
  <ServicesGridContainer>
    <ServicesGridTitle />
    <ServicesGridLayout>
      <div key="current-services">
        <CurrentServiceGridCard />
      </div>
      <div key="future-services">
        <FutureServicesGridCard />
      </div>
      <div key="available-services">
        <AvailableServicesGridCard />
      </div>
      <div key="past-services">
        <PastServicesGridCard />
      </div>
      <div key="paychecks">
        <PaycheckGridCard />
      </div>
    </ServicesGridLayout>
  </ServicesGridContainer>
);

export default ServicesGrid;
