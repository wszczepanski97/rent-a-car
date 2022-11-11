import type { FC } from "react";
import { CarDescriptionRowCirclePropertyProps } from "../cardescriptionrowproperty/cardescriptionrowcircleproperty/cardescriptionrowcircleproperty.component";
import CarDescriptionRowProperty, {
  CarDescriptionRowPropertyType,
} from "../cardescriptionrowproperty/cardescriptionrowproperty.component";

const PriceForDayProperty: FC<
  Pick<CarDescriptionRowCirclePropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionRowProperty
    type={CarDescriptionRowPropertyType.CIRCLE}
    title="CENA ZA DZIEŃ"
    bgColor="var(--primary-color)"
    color="var(--light-text-color)"
    value={value}
  />
);

export default PriceForDayProperty;
