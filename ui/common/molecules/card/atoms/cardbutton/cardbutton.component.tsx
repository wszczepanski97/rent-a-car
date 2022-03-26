import styles from "./cardbutton.module.css";

const CardButton = ({
  buttonText,
  color = "var(--primary-color)",
}: CardButtonProps) => (
  <button
    className={styles.cardButton}
    style={{ color, border: `1px solid ${color}` }}
  >
    <h6>{buttonText}</h6>
  </button>
);

export type CardButtonProps = {
  buttonText: string;
  color?: string;
};

export default CardButton;
