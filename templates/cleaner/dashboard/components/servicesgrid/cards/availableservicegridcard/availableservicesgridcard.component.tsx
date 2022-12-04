import React from "react";
import ServicesGridCard from "../../components/servicesgridcard/servicesgridcard.component";
import AvailableServicesGridCardTable from "./availableservicesgridcardtable/availableservicesgridcardtable.component";

const AvailableServicesGridCard = () => (
  <ServicesGridCard title="Dostępne mycia">
    <AvailableServicesGridCardTable />
  </ServicesGridCard>
);

export default AvailableServicesGridCard;
