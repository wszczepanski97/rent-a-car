import { Dispatch, SetStateAction } from "react";
import { Rental } from "types/rental/rental.type";

export type RentalSectionProps = {
  title: string;
  rentals: Rental[];
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteRentDetails?: Dispatch<
    SetStateAction<{
      IdWypozyczenia: number;
      IdUslugi: number;
    } | null>
  >;
  past?: boolean;
};
