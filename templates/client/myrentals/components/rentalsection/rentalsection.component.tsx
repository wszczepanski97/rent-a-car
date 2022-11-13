import type { FC } from "react";
import RentalCard from "./components/rentalcard";
import { RentalSectionProps } from "./rentalsection.props";

const RentalSection: FC<RentalSectionProps> = ({ rentals }) => (
  <RentalCard rentals={rentals} />
);

export default RentalSection;
