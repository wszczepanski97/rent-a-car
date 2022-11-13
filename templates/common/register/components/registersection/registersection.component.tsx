import { SidebarContext } from "contexts/sidebar.context";
import { useContext } from "react";
import UserForm from "ui/templates/userform";
import UserFormInput from "ui/templates/userform/components/userformcontainer/components/userforminput";
import UserFormInputGroup from "ui/templates/userform/components/userformcontainer/components/userforminputgroup";
import { UserFormContextProvider } from "ui/templates/userform/contexts/userform.context";
import styles from "./registersection.module.scss";

const RegisterSection = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.registerSection}
      style={{ height: open ? "100vh" : "calc(100vh - var(--navbar-height))" }}
    >
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

export default RegisterSection;
