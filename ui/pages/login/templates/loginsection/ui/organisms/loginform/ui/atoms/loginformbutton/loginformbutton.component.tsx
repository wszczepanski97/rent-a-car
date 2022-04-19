import styles from "./loginformbutton.module.scss";
import classnames from "classnames/bind";
import { signIn } from "next-auth/react";

const cx = classnames.bind(styles);

const LoginFormButton = () => (
  <button
    className={cx(styles.loginFormButton, "btn-text")}
    type="submit"
    // onClick={() =>
    //   signIn("credentials", {
    //     callbackUrl: `${window.location.origin}/`,
    //   })
    // }
  >
    Login
  </button>
);

export default LoginFormButton;
