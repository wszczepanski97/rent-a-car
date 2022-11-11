import styles from "./userformsubmitbutton.module.scss";

const UserFormSubmitButton = () => {
  return (
    <div className={styles.userFormSubmitButton}>
      <input type="submit" value="Zaloguj się" />
    </div>
  );
};

export default UserFormSubmitButton;
