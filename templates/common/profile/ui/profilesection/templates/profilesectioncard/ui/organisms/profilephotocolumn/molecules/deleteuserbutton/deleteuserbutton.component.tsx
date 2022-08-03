import { signOut } from "next-auth/react";
import { FC } from "react";
import { UserRole } from "templates";
import { useProfileSectionContext } from "templates/common/profile/ui/profilesection/profilesectionmode.context";
import styles from "./deleteuserbutton.module.scss";

const DeleteUserButton: FC = () => {
  const { profile } = useProfileSectionContext();
  const submitEndpoint =
    profile.type === UserRole.CLIENT ? `/api/client` : `/api/coordinator`;
  const submitBody =
    profile.type === UserRole.CLIENT
      ? {
          IdKlienci: profile.user?.IdKlienci,
          IdUzytkownicy: profile.user?.IdUzytkownicy,
        }
      : {
          IdPracownicy: profile.user?.IdPracownicy,
          IdUzytkownicy: profile.user?.IdUzytkownicy,
        };
  return (
    <button
      className={styles.DeleteUserButton}
      onClick={async () => {
        const response = await fetch(submitEndpoint, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitBody),
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
