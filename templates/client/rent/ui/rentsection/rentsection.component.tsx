import type { FC } from "react";
import { CarProps } from "templates/client/car/types";
import RentCard from "templates/client/rent/ui/rentsection/templates/rentcard/rentcard.component";

const RentSection: FC<CarProps> = ({ car }) => {
  return (
    <section id="rentSection">
      <RentCard car={car} />
    </section>
  );
};

export default RentSection;
