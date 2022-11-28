import type { FC } from "react";
import { RentalSectionProps } from "templates/client/myrentals/components/rentalsection/rentalsection.props";
import RentalCard from "./components/rentalcard";

const RentalSection: FC<RentalSectionProps> = ({ rentals }) => (
  <RentalCard rentals={rentals} />
);

export default RentalSection;
