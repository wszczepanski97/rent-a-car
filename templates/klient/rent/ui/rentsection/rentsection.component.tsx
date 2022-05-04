import { FC, useState } from "react";
import { CarProps } from "templates/klient";
import { RentCard } from "./templates";

const RentSection: FC<CarProps> = ({ car }) => {
  return (
    <section id="rentSection">
      <RentCard car={car} />
    </section>
  );
};

export default RentSection;
