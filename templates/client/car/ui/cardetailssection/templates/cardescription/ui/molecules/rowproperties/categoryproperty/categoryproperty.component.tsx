import type { FC } from "react";
import { CarDescriptionRowCirclePropertyProps } from "../cardescriptionrowproperty/cardescriptionrowcircleproperty/cardescriptionrowcircleproperty.component";
import CarDescriptionRowProperty, {
  CarDescriptionRowPropertyType,
} from "../cardescriptionrowproperty/cardescriptionrowproperty.component";

const CategoryProperty: FC<
  Pick<CarDescriptionRowCirclePropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionRowProperty
    type={CarDescriptionRowPropertyType.CIRCLE}
    title="KATEGORIA"
    bgColor="var(--text-color)"
    color="var(--light-text-color)"
    value={value}
  />
);

export default CategoryProperty;
