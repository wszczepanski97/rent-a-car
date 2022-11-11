import { FutureRental } from "pages/client/myrentals";
import type { FC } from "react";
import FutureRentalCard from "templates/client/myrentals/ui/futurerentalsection/templates/futurerentalcard/futurerentalcard.component";

export type FutureRentalSectionProps = {
  rentals: FutureRental[];
};

const FutureRentalSection: FC<FutureRentalSectionProps> = ({ rentals }) => (
  <>
    <FutureRentalCard rentals={rentals} />
  </>
);

export default FutureRentalSection;
