import { PastRental } from "pages/client/myrentals";
import { FC } from "react";
import { PastRentalCard } from "./templates";

export type PastRentalSectionProps = {
  rentals: PastRental[];
};

const PastRentalSection: FC<PastRentalSectionProps> = ({ rentals }) => (
  <>
    <PastRentalCard rentals={rentals} />
  </>
);

export default PastRentalSection;
