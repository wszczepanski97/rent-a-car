import type { FC } from "react";
import { CarDescriptionRowAvailabilityPropertyProps } from "../cardescriptionrowproperty/cardescriptionrowavailabilityproperty/cardescriptionrowavailabilityproperty.component";
import CarDescriptionRowProperty, {
  CarDescriptionRowPropertyType,
} from "../cardescriptionrowproperty/cardescriptionrowproperty.component";

const AvailabilityProperty: FC<
  Pick<CarDescriptionRowAvailabilityPropertyProps, "available">
> = ({ available }) => (
  <CarDescriptionRowProperty
    type={CarDescriptionRowPropertyType.AVAILABILITY}
    title="DOSTĘPNY"
    available={available}
  />
);

export default AvailabilityProperty;
