import { FC, HTMLInputTypeAttribute } from "react";
import styles from "./userforminput.module.scss";

type UserFormInputProps = {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
};

const UserFormInput: FC<UserFormInputProps> = ({
  name,
  placeholder,
  type,
  required,
}) => (
  <div className={styles.userFormInput}>
    <span className={styles.userFormInputName}>{name}</span>
    <input type={type} placeholder={placeholder} required={required} />
  </div>
);

export default UserFormInput;
