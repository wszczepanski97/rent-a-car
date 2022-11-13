import { CarDescriptionRowAvailabilityPropertyProps } from "./components/cardescriptionrowavailabilityproperty/cardescriptionrowavailabilityproperty.props";
import { CarDescriptionRowCirclePropertyProps } from "./components/cardescriptionrowcircleproperty/cardescriptionrowcircleproperty.props";

export type CarDescriptionRowPropertyProps = (
  | CarDescriptionRowCirclePropertyProps
  | CarDescriptionRowAvailabilityPropertyProps
) & { title: string };
