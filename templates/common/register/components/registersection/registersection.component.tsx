import { SidebarContext } from "contexts/sidebar.context";
import { useContext } from "react";
import ClientRegistrationForm from "templates/common/register/components/registersection/components/clientregistrationform/clientregistrationform.component";
import UserForm from "ui/templates/userform";
import { UserFormContextProvider } from "ui/templates/userform/contexts/userform.context";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import styles from "./registersection.module.scss";

const RegisterSection = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.registerSection}
      style={{
        height: open ? "100vh" : "calc(100vh - var(--navbar-height))",
      }}
    >
      <UserFormContextProvider type={UserFormContextEnum.REGISTER}>
        <UserForm>
          <ClientRegistrationForm />
        </UserForm>
      </UserFormContextProvider>
    </section>
  );
};

export default RegisterSection;
