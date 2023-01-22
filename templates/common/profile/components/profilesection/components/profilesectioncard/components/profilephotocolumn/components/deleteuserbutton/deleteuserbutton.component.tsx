import type { FC } from "react";
import { useProfileContext } from "templates/common/profile/context/profile.context.hook";
import styles from "./deleteuserbutton.module.scss";

const DeleteUserButton: FC = () => {
  const { profile, setModalOpen } = useProfileContext();
  if (!profile) return null;
  return (
    <button
      className={styles.deleteUserButton}
      onClick={() => {
        setModalOpen(true);
      }}
    >
      <h6>Usuń konto</h6>
    </button>
  );
};

export default DeleteUserButton;
