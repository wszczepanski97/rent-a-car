import { FC } from "react";
import Photo from "ui/atoms/photo";
import { UserFormErrorProps } from "ui/templates/userform/components/userformcontainer/components/userformerror/userformerror.props";
import styles from "./userformerror.module.scss";

const UserFormError: FC<UserFormErrorProps> = ({ message }) => (
  <>
    <Photo
      src="/images/RedCrossMark.jpg"
      alt="Red cross mark"
      size={{ height: "20", width: "20" }}
    />
    <span data-name="form-error" className={styles.userFormMessage}>
      {message}
    </span>
  </>
);

export default UserFormError;
