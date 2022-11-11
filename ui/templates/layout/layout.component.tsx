import type { FC } from "react";
import styles from "./layout.module.scss";

const Layout: FC = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

export default Layout;
