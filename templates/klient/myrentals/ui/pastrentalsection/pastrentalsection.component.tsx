import { MyRentalsPageProps } from "pages/klient/myrentals";
import { FC } from "react";
import { PastRentalCard } from "./templates";

const PastRentalSection: FC<MyRentalsPageProps> = ({ rentals }) => (
  <>
    <PastRentalCard rentals={rentals} />
  </>
);

export default PastRentalSection;
