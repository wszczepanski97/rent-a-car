import type { FC } from "react";
import Photo from "ui/atoms/photo";
import CarDescriptionColumnProperty, {
  CarDescriptionColumnPropertyProps,
} from "../cardescriptioncolumnproperty/cardescriptioncolumnproperty.component";

const NumberOfDoorsProperty: FC<
  Pick<CarDescriptionColumnPropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionColumnProperty
    photo={
      <Photo
        src="/images/NumberOfDoors.png"
        alt="Number of doors"
        size={{ height: "30", width: "30" }}
      />
    }
    value={value}
  />
);
export default NumberOfDoorsProperty;
