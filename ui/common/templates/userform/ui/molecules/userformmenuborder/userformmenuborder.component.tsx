import { useContext } from "react";
import { UserFormContext } from "../../../contexts/userform-context";
import styles from "./userformmenuborder.module.scss";

const UserFormMenuBorder = () => {
  const { menuBorderRef } = useContext(UserFormContext);
  return <div className={styles.userFormMenuBorder} ref={menuBorderRef}></div>;
};

export default UserFormMenuBorder;
