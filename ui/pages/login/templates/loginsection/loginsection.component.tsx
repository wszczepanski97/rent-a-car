import { FC } from "react";
import { LoginCarPhoto, LoginForm } from "./ui";
import styles from "./loginsection.module.scss";

const LoginSection: FC = () => (
  <section className={styles.loginSection}>
    <LoginCarPhoto />
    <LoginForm />
  </section>
);

export default LoginSection;
