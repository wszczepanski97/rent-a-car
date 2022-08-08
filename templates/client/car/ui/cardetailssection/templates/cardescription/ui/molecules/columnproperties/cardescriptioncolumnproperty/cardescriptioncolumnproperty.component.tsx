import { FC } from "react";
import styles from "./cardescriptioncolumnproperty.module.scss";

export type CarDescriptionColumnPropertyProps = {
  photo: React.ReactElement;
  value?: string;
};

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
