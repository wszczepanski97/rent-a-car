import { useRouter } from "next/router";
import { FC, HTMLInputTypeAttribute, useContext } from "react";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import styles from "./userformbutton.module.scss";

type UserFormButtonProps = {
  type: HTMLInputTypeAttribute;
  text: string;
  redirect?: string;
  enabled?: boolean;
};

const UserFormButton: FC<UserFormButtonProps> = ({
  type,
  text,
  redirect,
  enabled,
}) => {
  const router = useRouter();
  const { disabledSubmitButton } = useContext(UserFormContext);

  return (
    <div className={styles.userFormButton}>
      <input
        type={type}
        value={text}
        disabled={enabled ? !enabled : disabledSubmitButton}
        onClick={() => {
          if (redirect) {
            router.push(redirect);
          }
        }}
      />
    </div>
  );
};

export default UserFormButton;
