import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { ProfilePhotoColumnProps } from "../../profilephotocolumn.component";
import styles from "./deleteuserbutton.module.scss";

const DeleteUserButton: FC<ProfilePhotoColumnProps> = ({
  profile: { clientId, userId },
}) => {
  const router = useRouter();
  return (
    <button
      className={styles.DeleteUserButton}
      onClick={async () => {
        const response = await fetch(`/api/client`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            IdKlienci: clientId,
            IdUzytkownicy: userId,
          }),
        });
        await signOut({ redirect: true, callbackUrl: "/" });
        return await response.json();
      }}
    >
      <h6>Usuń konto</h6>
    </button>
  );
};

export default DeleteUserButton;
