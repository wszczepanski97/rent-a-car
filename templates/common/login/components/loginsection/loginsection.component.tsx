import { SidebarContext } from "contexts/sidebar.context";
import { useContext } from "react";
import { inputRequiredFieldRule } from "templates/coordinator/mydepartment/ui/deptcarsssection/organisms/deptcarssectiontable/validations";
import UserForm from "ui/templates/userform";
import UserFormInput from "ui/templates/userform/components/userformcontainer/components/userforminput";
import UserFormInputGroup from "ui/templates/userform/components/userformcontainer/components/userforminputgroup";
import { UserFormContextProvider } from "ui/templates/userform/contexts/userform.context";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import LoginCarPhoto from "./components/logincarphoto";
import styles from "./loginsection.module.scss";

const LoginSection = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.loginSection}
      style={{ height: open ? "100vh" : "calc(100vh - var(--navbar-height))" }}
    >
      <LoginCarPhoto />
      <UserFormContextProvider type={UserFormContextEnum.LOGIN}>
        <UserForm>
          <UserFormInputGroup>
            <UserFormInput
              placeholder="Wprowadź login"
              type="text"
              name="Login"
              validations={inputRequiredFieldRule}
            />
            <UserFormInput
              placeholder="Wprowadź hasło"
              type="password"
              name="Hasło"
              validations={inputRequiredFieldRule}
            />
          </UserFormInputGroup>
        </UserForm>
      </UserFormContextProvider>
    </section>
  );
};

export default LoginSection;
