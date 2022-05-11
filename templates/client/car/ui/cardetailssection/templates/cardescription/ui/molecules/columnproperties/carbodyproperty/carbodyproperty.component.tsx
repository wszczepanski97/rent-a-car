import { FC } from "react";
import { Photo } from "ui";
import CarDescriptionColumnProperty, {
  CarDescriptionColumnPropertyProps,
} from "../cardescriptioncolumnproperty/cardescriptioncolumnproperty.component";

const CarBodyProperty: FC<Pick<CarDescriptionColumnPropertyProps, "value">> = ({
  value,
}) => (
  <CarDescriptionColumnProperty
    photo={
      <Photo
        src="/images/CarBody.png"
        alt="Car Body"
        size={{ height: "30", width: "55" }}
      />
    }
    value={value}
  />
);
export default CarBodyProperty;
