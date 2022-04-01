import { FC, HTMLInputTypeAttribute } from "react";
import styles from "./loginforminput.module.scss";

const LoginFormInput: FC<LoginFormInputProps> = ({ type, name }) => (
  <input type={type} name={name} id={name} className={styles.loginFormInput} />
);

type LoginFormInputProps = {
  type: HTMLInputTypeAttribute;
  name: string;
};

export default LoginFormInput;
