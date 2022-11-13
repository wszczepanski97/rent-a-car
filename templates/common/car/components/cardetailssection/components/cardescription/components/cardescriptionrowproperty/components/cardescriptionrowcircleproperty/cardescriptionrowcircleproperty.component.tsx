import type { FC } from "react";
import styles from "./cardescriptionrowcircleproperty.module.scss";
import { CarDescriptionRowCirclePropertyProps } from "./cardescriptionrowcircleproperty.props";

const CarDescriptionRowCircleProperty: FC<
  CarDescriptionRowCirclePropertyProps
> = ({ bgColor, color, value }) => (
  <div
    className={styles.carDescriptionRowCircleProperty}
    style={{ backgroundColor: bgColor, color }}
  >
    <p>{value}</p>
  </div>
);

export default CarDescriptionRowCircleProperty;
