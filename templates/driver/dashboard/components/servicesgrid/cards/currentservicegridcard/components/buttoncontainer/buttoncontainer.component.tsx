import React, { FC } from "react";
import styles from "./buttoncontainer.module.scss";
const ButtonContainer: FC = ({ children }) => {
  return <div className={styles.buttonContainer}>{children}</div>;
};

export default ButtonContainer;
