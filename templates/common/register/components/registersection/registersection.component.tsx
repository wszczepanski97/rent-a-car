import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import RegisterSectionForm from "templates/common/register/components/registersection/components/registersectionform/registersectionform.component";
import { RegisterPageProps } from "templates/common/register/register.props";
import UserForm from "ui/templates/userform";
import { UserFormContextProvider } from "ui/templates/userform/contexts/userform.context";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import styles from "./registersection.module.scss";

const RegisterSection: FC<RegisterPageProps> = (props) => {
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
          <RegisterSectionForm {...props} />
        </UserForm>
      </UserFormContextProvider>
    </section>
  );
};

export default RegisterSection;
