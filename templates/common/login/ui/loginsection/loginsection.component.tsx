import { SidebarContext } from "contexts/sidebar-context";
import { useContext } from "react";
import {
  UserForm,
  UserFormContextProvider,
  UserFormInput,
  UserFormInputGroup,
} from "ui";
import styles from "./loginsection.module.scss";
import { LoginCarPhoto } from "./ui";

const LoginSection = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.loginSection}
      style={{ height: open ? "100vh" : "calc(100vh - var(--navbar-height))" }}
    >
      <LoginCarPhoto />
      <UserFormContextProvider>
        <UserForm>
          <UserFormInputGroup>
            <UserFormInput
              required
              placeholder="Wprowadź login"
              type="text"
              name="Login"
            />
            <UserFormInput
              required
              placeholder="Wprowadź hasło"
              type="password"
              name="Hasło"
            />
          </UserFormInputGroup>
        </UserForm>
      </UserFormContextProvider>
    </section>
  );
};

export default LoginSection;
