import React from "react";
import ServicesGridCard from "../../components/servicesgridcard/servicesgridcard.component";
import { default as PastServicesGridCardTable } from "./pastservicesgridcardtable/pastservicesgridcardtable.component";

const PastServicesGridCard = () => (
  <ServicesGridCard title="Zakończone mycia">
    <PastServicesGridCardTable />
  </ServicesGridCard>
);

export default PastServicesGridCard;
