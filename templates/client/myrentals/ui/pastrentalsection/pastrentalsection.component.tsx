import { PastRental } from "pages/client/myrentals";
import type { FC } from "react";
import PastRentalCard from "templates/client/myrentals/ui/pastrentalsection/templates/pastrentalcard/pastrentalcard.component";

export type PastRentalSectionProps = {
  rentals: PastRental[];
};

const PastRentalSection: FC<PastRentalSectionProps> = ({ rentals }) => (
  <>
    <PastRentalCard rentals={rentals} />
  </>
);

export default PastRentalSection;
