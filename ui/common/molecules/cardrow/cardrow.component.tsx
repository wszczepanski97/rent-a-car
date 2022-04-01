import { CSSProperties } from "react";
import styles from "./cardrow.module.scss";

const CardRow: React.FC<CardRowProps> = ({ children, style }) => (
  <div className={styles.cardRow} style={style}>
    {children}
  </div>
);

type CardRowProps = {
  style?: CSSProperties;
};

export default CardRow;
