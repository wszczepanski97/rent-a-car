import { useContext } from "react";
import { UserRole } from "ui";
import { UserFormContext } from "../../../contexts/userform-context";
import styles from "./userformtitle.module.scss";

const UserFormTitle = () => {
  const { activeDataItem } = useContext(UserFormContext);
  return (
    <div className={styles.userFormTitle}>
      Zaloguj się jako {UserRole[activeDataItem].toLowerCase()}
    </div>
  );
};

export default UserFormTitle;
