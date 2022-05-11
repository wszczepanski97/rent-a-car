import { FC } from "react";
import { CarProps } from "templates/client";
import { BackToPricingButton } from "./molecules";
import { CarCard } from "./templates";

const CarDetailsSection: FC<CarProps> = ({ car }) => (
  <section id="carDetailsSection">
    <CarCard car={car} />
    <BackToPricingButton />
  </section>
);

export default CarDetailsSection;
