import { FC, HTMLInputTypeAttribute, useState } from "react";
import styles from "./loginforminput.module.scss";

const LoginFormInput: FC<LoginFormInputProps> = ({ type, name }) => {
  const [value, setValue] = useState("");
  return (
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.loginFormInput}
    />
  );
};

type LoginFormInputProps = {
  type: HTMLInputTypeAttribute;
  name: string;
};

export default LoginFormInput;
