import { ChangeEvent, FC, useState } from "react";
import { UserFormSelectProps } from "ui/templates/userform/components/userformcontainer/components/userformselect/userformselect.props";
import styles from "./userformselect.module.scss";

const UserFormSelect: FC<UserFormSelectProps> = ({
  options,
  name,
  onSelectChange,
}) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onSelectChange?.(e);
  };
  return (
    <div className={styles.userFormSelect}>
      <span className={styles.userFormSelectName}>{name}</span>
      <select
        id={name}
        name={name}
        data-name={`form-select`}
        required
        value={value}
        onChange={onChange}
      >
        {options}
      </select>
    </div>
  );
};

export default UserFormSelect;
