import { FC } from "react";
import {
  LoginFormButton,
  LoginFormFieldName,
  LoginFormFieldPassword,
  LoginFormHeader,
} from "./ui";
import styles from "./loginform.module.scss";

const LoginForm: FC = () => (
  <form action="#" className={styles.loginForm}>
    <LoginFormHeader />
    <div className={styles.loginFormFieldGroup}>
      <LoginFormFieldName />
      <LoginFormFieldPassword />
    </div>
    <LoginFormButton />
  </form>
);

export default LoginForm;
