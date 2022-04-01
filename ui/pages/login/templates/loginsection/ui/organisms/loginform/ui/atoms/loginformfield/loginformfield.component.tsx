import { FC } from "react";
import styles from "./loginformfield.module.scss";

const LoginFormField: FC = ({ children }) => (
  <div className={styles.loginFormField}>{children}</div>
);

export default LoginFormField;
