import { FC } from "react";
import { CarProps } from "templates/car/types";
import { BackToPricingButton } from "./molecules";
import { CarCard } from "./templates";

const CarDetailsSection: FC<CarProps> = ({ car }) => (
  <>
    <CarCard car={car} />
    <BackToPricingButton />
  </>
);

export default CarDetailsSection;
