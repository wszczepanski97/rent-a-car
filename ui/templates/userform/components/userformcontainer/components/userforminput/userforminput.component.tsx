import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import UserFormError from "ui/templates/userform/components/userformcontainer/components/userformerror/userformerror.component";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import styles from "./userforminput.module.scss";
import { UserFormInputProps } from "./userforminput.props";

const UserFormInput: FC<UserFormInputProps> = ({
  name,
  placeholder,
  type,
  minLength,
  maxLength,
  validations,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { setDisabledSubmitButton, setError: setFormError } =
    useContext(UserFormContext);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormError("");
    setValue(e.target.value);
    if (validations) {
      for (const [_, validation] of Object.entries(validations)) {
        const isError = !validation.validator(e.target.value);
        if (isError) {
          setError(validation.message);
          break;
        } else {
          setError("");
          const areEmptyInputs = !!Array.from(
            document.querySelectorAll('[data-name="form-input"]')
          ).filter((input) => (input as HTMLInputElement).value.length === 0)
            .length;
          const areInputErrors = !!Array.from(
            document.querySelectorAll('[data-name="form-error"]')
          ).length;
          setDisabledSubmitButton(areEmptyInputs || areInputErrors);
        }
      }
    }
  };

  useEffect(() => {
    const areEmptyInputs = !!Array.from(
      document.querySelectorAll('[data-name="form-input"]')
    ).filter((input) => (input as HTMLInputElement).value.length === 0).length;
    const areInputErrors = !!Array.from(
      document.querySelectorAll('[data-name="form-error"]')
    ).length;
    setDisabledSubmitButton(areEmptyInputs || areInputErrors);
  });

  return (
    <div className={styles.userFormInput}>
      <span className={styles.userFormInputName}>{name}</span>
      <input
        id={name}
        className={error ? styles.error : undefined}
        data-name={`form-input`}
        name={name.replace(/\s/g, "")}
        type={type}
        placeholder={placeholder}
        required
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      {error && <UserFormError message={error} />}
    </div>
  );
};

export default UserFormInput;
