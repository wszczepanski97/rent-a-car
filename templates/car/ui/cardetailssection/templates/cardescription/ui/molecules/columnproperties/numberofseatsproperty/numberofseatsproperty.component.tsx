import { FC } from "react";
import { Photo } from "ui";
import CarDescriptionColumnProperty, {
  CarDescriptionColumnPropertyProps,
} from "../cardescriptioncolumnproperty/cardescriptioncolumnproperty.component";

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
