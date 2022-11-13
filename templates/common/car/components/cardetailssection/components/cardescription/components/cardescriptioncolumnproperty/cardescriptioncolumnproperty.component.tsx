import type { FC } from "react";
import styles from "./cardescriptioncolumnproperty.module.scss";
import { CarDescriptionColumnPropertyProps } from "./cardescriptioncolumnproperty.props";

const CarDescriptionColumnProperty: FC<CarDescriptionColumnPropertyProps> = ({
  photo,
  value,
}) => (
  <div className={styles.carDescriptionColumnPropertyWrapper}>
    {photo}
    <p>{value || "BRAK INFORMACJI"}</p>
  </div>
);

export default CarDescriptionColumnProperty;
