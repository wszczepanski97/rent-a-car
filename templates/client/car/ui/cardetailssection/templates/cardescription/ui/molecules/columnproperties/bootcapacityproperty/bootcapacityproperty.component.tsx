import type { FC } from "react";
import Photo from "ui/atoms/photo";
import CarDescriptionColumnProperty, {
  CarDescriptionColumnPropertyProps,
} from "../cardescriptioncolumnproperty/cardescriptioncolumnproperty.component";

const BootCapacityProperty: FC<
  Pick<CarDescriptionColumnPropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionColumnProperty
    photo={
      <Photo
        src="/images/BootCapacity.webp"
        alt="Boot Capacity"
        size={{ height: "30", width: "55" }}
      />
    }
    value={value}
  />
);
export default BootCapacityProperty;
