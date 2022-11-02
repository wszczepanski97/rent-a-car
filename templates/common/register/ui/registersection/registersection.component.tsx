import { SidebarContext } from "contexts/sidebar-context";
import { useContext } from "react";
import styles from "./registersection.module.scss";
import { RegisterForm } from "./ui";

const RegisterSection = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.registerSection}
      style={{ height: open ? "100vh" : "calc(100vh - var(--navbar-height))" }}
    >
      <RegisterForm />
    </section>
  );
};

export default RegisterSection;
