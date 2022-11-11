import type { FC } from "react";
import type { CarProps } from "templates/client/car/types";
import BackToPricingButton from "templates/client/car/ui/cardetailssection/molecules/backtopricingbutton/backtopricingbutton.component";
import CarCard from "templates/client/car/ui/cardetailssection/templates/carcard/carcard.component";

const CarDetailsSection: FC<CarProps> = ({ car }) => (
  <section id="carDetailsSection">
    <CarCard car={car} />
    <BackToPricingButton />
  </section>
);

export default CarDetailsSection;
