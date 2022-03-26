import { UserActionArticle, AdvertisingCardsRow } from "./molecules";
import styles from "./headersection.module.css";

const HeaderAdvertisingSection = () => (
  <section className={styles.headerSection}>
    <UserActionArticle />
    <AdvertisingCardsRow />
  </section>
);

export default HeaderAdvertisingSection;
