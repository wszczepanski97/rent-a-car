import { useContext } from "react";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import styles from "./userformmenuborder.module.scss";

const UserFormMenuBorder = () => {
  const { menuBorderRef, type } = useContext(UserFormContext);
  return (
    <div
      className={styles.userFormMenuBorder}
      ref={menuBorderRef}
      style={
        type === UserFormContextEnum.REGISTER
          ? { transform: "translate3d(139px, 0px, 0px)" }
          : undefined
      }
    ></div>
  );
};

export default UserFormMenuBorder;
