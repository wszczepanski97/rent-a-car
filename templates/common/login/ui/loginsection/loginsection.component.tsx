import { SidebarContext } from "contexts/sidebar-context";
import { useContext } from "react";
import styles from "./loginsection.module.scss";
import { LoginCarPhoto, LoginForm } from "./ui";

const LoginSection = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.loginSection}
      style={{ height: open ? "100vh" : "calc(100vh - var(--navbar-height))" }}
    >
      <LoginCarPhoto />
      <LoginForm />
    </section>
  );
};

export default LoginSection;
