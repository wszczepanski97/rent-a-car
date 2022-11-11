import styles from "./userformsubmitbutton.module.scss";

const UserFormSubmitButton = () => (
  <div className={styles.userFormSubmitButton}>
    <input type="submit" value="Zaloguj się" />
  </div>
);

export default UserFormSubmitButton;
