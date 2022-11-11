import { useContext } from "react";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import UserFormMenuBorder from "./components/userformmenuborder";
import UserFormMenuButton from "./components/userformmenubutton";
import styles from "./UserFormmenu.module.scss";

const UserFormMenu = () => {
  const { menuRef } = useContext(UserFormContext);
  return (
    <div className={styles.userFormMenu} ref={menuRef}>
      <UserFormMenuButton
        color="#ff8c00"
        dataItem="CLIENT"
        iconClass="bx bx-user-circle"
      />
      <UserFormMenuButton
        color="#f54888"
        dataItem="COORDINATOR"
        iconClass="bx bxs-group"
      />
      <UserFormMenuButton
        color="#4343f5"
        dataItem="DRIVER"
        iconClass="bx bxs-key"
      />
      <UserFormMenuButton
        color="#bb9000"
        dataItem="MECHANIC"
        iconClass="bx bxs-car-mechanic"
      />
      <UserFormMenuButton
        color="#22604c"
        dataItem="CLEANER"
        iconClass="bx bxs-car-wash"
      />
      <UserFormMenuBorder />
    </div>
  );
};

export default UserFormMenu;
