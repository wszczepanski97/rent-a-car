import { FC } from "react";
import styles from "../styles.module.scss";

type TabContainerProps = {
  height?: number;
  width?: number;
  gap?: number;
};

const TabContainer: FC<TabContainerProps> = ({ children }) => {
  return <div className={styles.tabContainer}>{children}</div>;
};

export default TabContainer;
