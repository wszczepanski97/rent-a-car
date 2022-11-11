import type { FC } from "react";
import styles from "./cardescriptioncolumn.module.scss";

const CarDescriptionColumn: FC = ({ children }) => (
  <div className={styles.carDescriptionColumn}>{children}</div>
);

export default CarDescriptionColumn;
