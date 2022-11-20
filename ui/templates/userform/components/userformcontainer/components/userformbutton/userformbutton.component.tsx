import { useRouter } from "next/router";
import { FC, HTMLInputTypeAttribute } from "react";
import styles from "./userformbutton.module.scss";

type UserFormButtonProps = {
  type: HTMLInputTypeAttribute;
  text: string;
  redirect?: string;
};

const UserFormButton: FC<UserFormButtonProps> = ({ type, text, redirect }) => {
  const router = useRouter();
  return (
    <div
      className={styles.userFormButton}
      onClick={() => {
        if (redirect) {
          router.push(redirect);
        }
      }}
    >
      <input type={type} value={text} />
    </div>
  );
};

export default UserFormButton;
