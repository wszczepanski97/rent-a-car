import type { FC } from "react";
import styles from "./userforminputgroup.module.scss";

const UserFormInputGroup: FC = ({ children }) => (
  <div className={styles.userFormInputGroup}>{children}</div>
);

export default UserFormInputGroup;
