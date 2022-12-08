import React, { FC } from "react";
import styles from "./button.module.scss";

type ButtonProps = {
  bgColor: string;
  disabled?: boolean;
  onClick: () => void;
  text: string;
};

const Button: FC<ButtonProps> = ({
  bgColor,
  disabled = false,
  onClick,
  text,
}) => (
  <button
    className={styles.button}
    onClick={() => onClick()}
    style={{ backgroundColor: disabled ? "#333333" : bgColor }}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
