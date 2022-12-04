import { Rental } from "types/rental/rental.type";

export type RentalSectionProps = {
  title: string;
  rentals: Rental[];
  past?: boolean;
};
