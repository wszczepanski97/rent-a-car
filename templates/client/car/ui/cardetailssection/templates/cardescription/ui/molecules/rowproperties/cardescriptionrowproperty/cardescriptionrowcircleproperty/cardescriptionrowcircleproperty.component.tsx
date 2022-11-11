import type { FC } from "react";
import { CarDescriptionRowPropertyType } from "../cardescriptionrowproperty.component";
import styles from "./cardescriptionrowcircleproperty.module.scss";

export type CarDescriptionRowCirclePropertyProps = {
  type: CarDescriptionRowPropertyType.CIRCLE;
  bgColor: string;
  color: string;
  value?: string | number;
};

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
