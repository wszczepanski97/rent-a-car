import { useContext } from "react";
import { UserRole } from "types/userrole/userrole.type";
import { UserFormContext } from "../../../../contexts/userform.context";
import styles from "./userformtitle.module.scss";

const UserFormTitle = () => {
  const { activeDataItem, userFormActionText } = useContext(UserFormContext);
  return (
    <div className={styles.userFormTitle}>
      {userFormActionText} jako {UserRole[activeDataItem].toLowerCase()}
    </div>
  );
};

export default UserFormTitle;
