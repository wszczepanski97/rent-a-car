import type { FC } from "react";
import CarDescriptionRowProperty from "../../../cardescriptionrowproperty";
import { CarDescriptionRowPropertyEnum } from "../../../cardescriptionrowproperty/cardescriptionrowproperty.enum";
import { CarDescriptionRowCirclePropertyProps } from "../../../cardescriptionrowproperty/components/cardescriptionrowcircleproperty/cardescriptionrowcircleproperty.props";

const PriceForHourProperty: FC<
  Pick<CarDescriptionRowCirclePropertyProps, "value">
> = ({ value }) => (
  <CarDescriptionRowProperty
    type={CarDescriptionRowPropertyEnum.CIRCLE}
    title="CENA ZA GODZINĘ"
    bgColor="var(--primary-color)"
    color="var(--light-text-color)"
    value={value}
  />
);

export default PriceForHourProperty;
