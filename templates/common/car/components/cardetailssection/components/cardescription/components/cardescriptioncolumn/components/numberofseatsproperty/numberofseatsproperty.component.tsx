import type { FC } from "react";
import Photo from "ui/atoms/photo";
import CarDescriptionColumnProperty from "../../../cardescriptioncolumnproperty";
import { CarDescriptionColumnPropertyProps } from "../../../cardescriptioncolumnproperty/cardescriptioncolumnproperty.props";

const NumberOfSeatsProperty: FC<
  Pick<CarDescriptionColumnPropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionColumnProperty
    photo={
      <Photo
        src="/images/NumberOfSeats.png"
        alt="Number of seats"
        size={{ height: "30", width: "25" }}
      />
    }
    value={value}
  />
);
export default NumberOfSeatsProperty;
