import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, FormEvent, useContext } from "react";
import { UserRole } from "ui";
import { UserFormSubmitButton, UserFormTitle } from "../../.";
import { UserFormContext } from "../../../contexts/userform-context";
import styles from "./userformcontainer.module.scss";

const UserFormContainer: FC = ({ children }) => {
  const router = useRouter();
  const { activeDataItem, setError } = useContext(UserFormContext);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await signIn<"credentials">("credentials", {
      redirect: false,
      ...Object.fromEntries(formData),
    });
    if (res?.error) {
      setError("Wprowadzone dane logowania są niepoprawne.");
    } else {
      setError("");
      router.push(`/${activeDataItem.toLowerCase()}/dashboard`);
    }
  };
  return (
    <div className={styles.userFormContainer}>
      <UserFormTitle />
      <form action="#" onSubmit={onSubmit}>
        {children}
        <input name="role" type="hidden" value={UserRole[activeDataItem]} />
        <UserFormSubmitButton />
      </form>
    </div>
  );
};

export default UserFormContainer;