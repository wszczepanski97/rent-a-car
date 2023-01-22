import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./modal.module.scss";

const Modal: FC<{
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  deleteRentDetails?: {
    IdWypozyczenia: number;
    IdUslugi: number;
  } | null;
}> = ({ setModalOpen, deleteRentDetails }) => {
  const router = useRouter();
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
          <h3>Czy na pewno chcesz usunąć wypozyczenie?</h3>
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
              const response = await fetch(`/api/client/rent`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  IdWypozyczenia: deleteRentDetails?.IdWypozyczenia,
                  IdUslugi: deleteRentDetails?.IdUslugi,
                }),
              });
              await response.json();
              router.push("/client/myrentals");
              setModalOpen(false);
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
