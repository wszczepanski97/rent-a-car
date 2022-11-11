import { FC } from "react";
import { UserFormContextProvider } from "./contexts/userform-context";
import { UserFormContainer, UserFormMenu, UserFormSvgContainer } from "./ui";
import styles from "./userform.module.scss";

const UserForm: FC = ({ children }) => (
  <UserFormContextProvider>
    <div className={styles.userForm}>
      <UserFormMenu />
      <UserFormSvgContainer />
      <UserFormContainer>{children}</UserFormContainer>
    </div>
  </UserFormContextProvider>
);

export default UserForm;
