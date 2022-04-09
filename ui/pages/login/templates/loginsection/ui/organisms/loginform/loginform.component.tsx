import { FC, useState } from "react";
import {
  LoginFormButton,
  LoginFormFieldName,
  LoginFormFieldPassword,
  LoginFormHeader,
} from "./ui";
import styles from "./loginform.module.scss";

const LoginForm: FC = () => {
  // const [loginError, setLoginError] = useState("");
  // const handleLogin = (event) => {
  //   event.preventDefault();
  // };

  return (
    <form
      className={styles.loginForm}
      // onSubmit={handleLogin}
    >
      <LoginFormHeader />
      <div className={styles.loginFormFieldGroup}>
        {/* {loginError} */}
        <LoginFormFieldName />
        <LoginFormFieldPassword />
      </div>
      <LoginFormButton />
    </form>
  );
};

export default LoginForm;
