import type { FC } from "react";
import Photo from "ui/atoms/photo";
import CarDescriptionColumnProperty, {
  CarDescriptionColumnPropertyProps,
} from "../cardescriptioncolumnproperty/cardescriptioncolumnproperty.component";

const FuelTypeProperty: FC<
  Pick<CarDescriptionColumnPropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionColumnProperty
    photo={
      <Photo
        src="/images/FuelType.webp"
        alt="Fuel Type"
        size={{ height: "30", width: "20" }}
      />
    }
    value={value}
  />
);
export default FuelTypeProperty;
