import type { FC } from "react";
import CarDescriptionRowAvailabilityProperty, {
  CarDescriptionRowAvailabilityPropertyProps,
} from "./cardescriptionrowavailabilityproperty/cardescriptionrowavailabilityproperty.component";
import CarDescriptionRowCircleProperty, {
  CarDescriptionRowCirclePropertyProps,
} from "./cardescriptionrowcircleproperty/cardescriptionrowcircleproperty.component";
import styles from "./cardescriptionrowproperty.module.scss";

export enum CarDescriptionRowPropertyType {
  CIRCLE = "CIRCLE",
  AVAILABILITY = "AVAILABILITY",
}

type CarDescriptionRowPropertyProps = (
  | CarDescriptionRowCirclePropertyProps
  | CarDescriptionRowAvailabilityPropertyProps
) & { title: string };

const CarDescriptionRowProperty: FC<CarDescriptionRowPropertyProps> = (
  props
) => (
  <div className={styles.carDescriptionRowPropertyWrapper}>
    <p>{props.title.toUpperCase()}</p>
    {props.type === CarDescriptionRowPropertyType.CIRCLE ? (
      <CarDescriptionRowCircleProperty {...props} />
    ) : (
      <CarDescriptionRowAvailabilityProperty {...props} />
    )}
  </div>
);

export default CarDescriptionRowProperty;
