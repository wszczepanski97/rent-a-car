import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, FormEvent, useContext } from "react";
import { UserRole } from "types/userrole/userrole.type";
import UserFormRegisterButton from "ui/templates/userform/components/userformcontainer/components/userformregisterbutton";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import UserFormSubmitButton from "./components/userformsubmitbutton";
import UserFormTitle from "./components/userformtitle/userformtitle.component";
import styles from "./userformcontainer.module.scss";

const UserFormContainer: FC = ({ children }) => {
  const router = useRouter();
  const { activeDataItem, error, setError, type } = useContext(UserFormContext);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await signIn<"credentials">("credentials", {
      redirect: false,
      ...Object.fromEntries(formData),
    });
    console.log(res);
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
        <span>{error}</span>
        <UserFormSubmitButton />
        {type === UserFormContextEnum.LOGIN && <UserFormRegisterButton />}
      </form>
    </div>
  );
};

export default UserFormContainer;
