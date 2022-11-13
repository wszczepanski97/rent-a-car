import Link from "next/link";
import styles from "./backtopricingbutton.module.scss";

const BackToPricingButton = () => (
  <Link href="/client/rent">
    <button className={styles.backToPricingButton}>
      <p>Wróć do przeglądania samochodów</p>
    </button>
  </Link>
);

export default BackToPricingButton;
