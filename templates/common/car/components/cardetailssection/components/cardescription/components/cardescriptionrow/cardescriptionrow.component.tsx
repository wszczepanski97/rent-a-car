import type { FC } from "react";
import styles from "./cardescriptionrow.module.scss";

const CarDescriptionRow: FC = ({ children }) => (
  <div className={styles.carDescriptionRow}>{children}</div>
);

export default CarDescriptionRow;
