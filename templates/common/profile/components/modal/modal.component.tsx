import { signOut } from "next-auth/react";
import { useProfileContext } from "templates/common/profile/context/profile.context.hook";
import { UserRole } from "types/userrole/userrole.type";
import styles from "./modal.module.scss";

const Modal = () => {
  const { profile, setModalOpen } = useProfileContext();
  const submitEndpoint =
    profile?.type === UserRole.CLIENT ? `/api/client` : `/api/coordinator`;
  const submitBody =
    profile?.type === UserRole.CLIENT
      ? {
          IdKlienci: profile.user?.IdKlienci,
          IdUzytkownicy: profile.user?.IdUzytkownicy,
        }
      : {
          IdPracownicy: profile?.user?.IdPracownicy,
          IdUzytkownicy: profile?.user?.IdUzytkownicy,
        };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className={styles.title}>
          <h3>Czy na pewno chcesz usunąć konto?</h3>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id={styles.cancelBtn}
          >
            Anuluj
          </button>
          <button
            onClick={async () => {
              const response = await fetch(submitEndpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitBody),
              });
              setModalOpen(false);
              await signOut({ redirect: true, callbackUrl: "/" });
              await response.json();
            }}
          >
            Zatwierdź
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
