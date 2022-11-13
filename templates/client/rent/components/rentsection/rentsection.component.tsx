import type { FC } from "react";
import { CarPageProps } from "templates/common/car/types/car.props";
import RentCard from "./components/rentcard";

const RentSection: FC<CarPageProps> = ({ car }) => (
  <section id="rentSection">
    <RentCard car={car} />
  </section>
);

export default RentSection;
