import type { FC } from "react";
import { CarPageProps } from "templates/common/car/types/car.props";
import BackToPricingButton from "./components/backtopricingbutton";
import CarCard from "./components/carcard";

const CarDetailsSection: FC<CarPageProps> = ({ car }) => (
  <section id="carDetailsSection">
    <CarCard car={car} />
    <BackToPricingButton />
  </section>
);

export default CarDetailsSection;
