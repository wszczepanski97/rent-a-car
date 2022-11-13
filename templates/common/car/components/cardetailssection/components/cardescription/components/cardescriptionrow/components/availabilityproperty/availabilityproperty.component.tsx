import type { FC } from "react";
import CarDescriptionRowProperty from "../../../cardescriptionrowproperty";
import { CarDescriptionRowPropertyEnum } from "../../../cardescriptionrowproperty/cardescriptionrowproperty.enum";
import type { CarDescriptionRowAvailabilityPropertyProps } from "../../../cardescriptionrowproperty/components/cardescriptionrowavailabilityproperty/cardescriptionrowavailabilityproperty.props";

const AvailabilityProperty: FC<
  Pick<CarDescriptionRowAvailabilityPropertyProps, "available">
> = ({ available }) => (
  <CarDescriptionRowProperty
    type={CarDescriptionRowPropertyEnum.AVAILABILITY}
    title="DOSTĘPNY"
    available={available}
  />
);

export default AvailabilityProperty;
