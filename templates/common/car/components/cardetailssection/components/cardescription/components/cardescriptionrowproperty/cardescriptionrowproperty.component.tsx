import type { FC } from "react";
import { CarDescriptionRowPropertyEnum } from "./cardescriptionrowproperty.enum";
import styles from "./cardescriptionrowproperty.module.scss";
import { CarDescriptionRowPropertyProps } from "./cardescriptionrowproperty.props";
import CarDescriptionRowAvailabilityProperty from "./components/cardescriptionrowavailabilityproperty";
import CarDescriptionRowCircleProperty from "./components/cardescriptionrowcircleproperty";

const CarDescriptionRowProperty: FC<CarDescriptionRowPropertyProps> = (
  props
) => (
  <div className={styles.carDescriptionRowPropertyWrapper}>
    <p>{props.title.toUpperCase()}</p>
    {props.type === CarDescriptionRowPropertyEnum.CIRCLE ? (
      <CarDescriptionRowCircleProperty {...props} />
    ) : (
      <CarDescriptionRowAvailabilityProperty {...props} />
    )}
  </div>
);

export default CarDescriptionRowProperty;
