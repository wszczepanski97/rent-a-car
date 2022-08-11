import React, { FC } from "react";
import styles from "../styles.module.scss";

type TabContainerProps = {
  height?: number;
  width?: number;
  gap?: number;
};

const TabContainer: FC<TabContainerProps> = ({
  children,
  height = 250,
  width = 500,
  gap = 20,
}) => {
  return (
    <div className={styles.tabContainer} style={{ height, width, gap }}>
      {children}
    </div>
  );
};

export default TabContainer;
