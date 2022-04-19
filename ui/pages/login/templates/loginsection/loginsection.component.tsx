import { LoginCarPhoto, LoginForm } from "./ui";
import styles from "./loginsection.module.scss";

const LoginSection = () => {
  return (
    <section className={styles.loginSection}>
      <LoginCarPhoto />
      <LoginForm />
    </section>
  );
};

export default LoginSection;
