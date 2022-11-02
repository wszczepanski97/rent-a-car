import styles from "./loginformbutton.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

const LoginFormButton = () => (
  <button className={cx(styles.loginFormButton, "btn-text")} type="submit">
    Zaloguj się
  </button>
);

export default LoginFormButton;
