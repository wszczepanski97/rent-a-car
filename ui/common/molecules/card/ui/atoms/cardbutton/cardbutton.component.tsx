import { FC } from "react";
import { Heading } from "../../../../../../../ui/common";
import styles from "./cardbutton.module.scss";

const CardButton: FC<CardButtonProps> = ({
  buttonText,
  color = "var(--primary-color)",
}) => (
  <button
    className={styles.cardButton}
    style={{ color, border: `1px solid ${color}` }}
  >
    <Heading text={buttonText} as="h6" style={{ color }} />
  </button>
);

export type CardButtonProps = {
  buttonText: string;
  color?: string;
};

export default CardButton;
