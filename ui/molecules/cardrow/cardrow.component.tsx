import type { FC } from "react";
import styles from "./cardrow.module.scss";
import { CardRowProps } from "./cardrow.props";

const CardRow: FC<CardRowProps> = ({ children, style }) => (
  <div className={styles.cardRow} style={style}>
    {children}
  </div>
);

export default CardRow;
