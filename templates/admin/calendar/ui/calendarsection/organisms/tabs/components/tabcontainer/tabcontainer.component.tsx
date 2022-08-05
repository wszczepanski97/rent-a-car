import React, { FC } from "react";
import styles from "../styles.module.scss";

type TabContainerProps = {
  height?: number;
  width?: number;
};

const TabContainer: FC<TabContainerProps> = ({
  children,
  height = 250,
  width = 500,
}) => {
  return (
    <div className={styles.tabContainer} style={{ height, width }}>
      {children}
    </div>
  );
};

export default TabContainer;
