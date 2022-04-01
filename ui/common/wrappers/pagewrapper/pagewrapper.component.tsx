import { FC } from "react";
import styles from "./pagewrapper.module.scss";

const PageWrapper: FC = ({ children }) => (
  <div className={styles.pageWrapper}>{children}</div>
);

export default PageWrapper;
