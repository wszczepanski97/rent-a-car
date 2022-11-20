import type { FC } from "react";
import UserFormContainer from "./components/userformcontainer";
import UserFormMenu from "./components/userformmenu";
import UserFormSvgContainer from "./components/userformsvgcontainer";
import styles from "./userform.module.scss";

const UserForm: FC = ({ children }) => (
  <div className={styles.userForm}>
    <UserFormMenu />
    <UserFormSvgContainer />
    <UserFormContainer>{children}</UserFormContainer>
  </div>
);

export default UserForm;
