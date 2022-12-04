import React from "react";
import ServicesGridCard from "../../components/servicesgridcard/servicesgridcard.component";
import FutureServicesGridCardTable from "./futureservicesgridcardtable/futureservicesgridcardtable.component";

const FutureServicesGridCard = () => (
  <ServicesGridCard title="Przyszłe naprawy">
    <FutureServicesGridCardTable />
  </ServicesGridCard>
);

export default FutureServicesGridCard;
