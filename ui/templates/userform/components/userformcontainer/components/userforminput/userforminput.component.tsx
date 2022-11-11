import type { FC } from "react";
import styles from "./userforminput.module.scss";
import { UserFormInputProps } from "./userforminput.props";

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
