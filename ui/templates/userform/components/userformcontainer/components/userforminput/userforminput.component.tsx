import { FC, useState } from "react";
import styles from "./userforminput.module.scss";
import { UserFormInputProps } from "./userforminput.props";

const UserFormInput: FC<UserFormInputProps> = ({
  name,
  placeholder,
  type,
  required,
}) => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.userFormInput}>
      <span className={styles.userFormInputName}>{name}</span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default UserFormInput;
