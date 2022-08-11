import React, { FC } from "react";
import styles from "../styles.module.scss";

type TabErrorProps = {
  index: number;
};

const TabError: FC<TabErrorProps> = ({ index }) => {
  return <span id={`err${index}`} className={styles.tabError} />;
};

export default TabError;
