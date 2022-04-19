import { FC } from "react";
import {
  LoginFormButton,
  LoginFormFieldName,
  LoginFormFieldPassword,
  LoginFormHeader,
} from "./ui";
import styles from "./loginform.module.scss";
import { CsrfContext } from "pages/login";

const LoginForm: FC = () => {
  return (
    <CsrfContext.Consumer>
      {(csrf) => (
        <form
          className={styles.loginForm}
          method="post"
          action="/api/auth/callback/credentials"
        >
          <LoginFormHeader />
          <div className={styles.loginFormFieldGroup}>
            <input name="csrfToken" type="hidden" defaultValue={csrf} />
            <LoginFormFieldName />
            <LoginFormFieldPassword />
          </div>
          <LoginFormButton />
        </form>
      )}
    </CsrfContext.Consumer>
  );
};

export default LoginForm;
