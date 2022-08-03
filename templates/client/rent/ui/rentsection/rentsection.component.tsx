import { Session } from "next-auth";
import { FC } from "react";
import { Car } from "templates";
import { RentCard } from "./templates";

type RentSectionProps = {
  car: Car;
  session: Session | null;
};

const RentSection: FC<RentSectionProps> = ({ car }) => {
  return (
    <section id="rentSection">
      <RentCard car={car} />
    </section>
  );
};

export default RentSection;
