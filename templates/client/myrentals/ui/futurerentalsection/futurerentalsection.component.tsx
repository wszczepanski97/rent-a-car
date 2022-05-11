import { FutureRental } from "pages/client/myrentals";
import { FC } from "react";
import { FutureRentalCard } from "./templates";

export type FutureRentalSectionProps = {
  rentals: FutureRental[];
};

const FutureRentalSection: FC<FutureRentalSectionProps> = ({ rentals }) => (
  <>
    <FutureRentalCard rentals={rentals} />
  </>
);

export default FutureRentalSection;
