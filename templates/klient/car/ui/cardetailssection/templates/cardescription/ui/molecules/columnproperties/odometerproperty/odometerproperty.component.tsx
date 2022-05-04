import { FC } from "react";
import { Photo } from "ui";
import CarDescriptionColumnProperty, {
  CarDescriptionColumnPropertyProps,
} from "../cardescriptioncolumnproperty/cardescriptioncolumnproperty.component";

const OdometerProperty: FC<
  Pick<CarDescriptionColumnPropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionColumnProperty
    photo={
      <Photo
        src="/images/Odometer.png"
        alt="Odometer"
        size={{ height: "30", width: "60" }}
      />
    }
    value={value}
  />
);
export default OdometerProperty;
