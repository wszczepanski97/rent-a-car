import { FC } from "react";
import { UserActionArticle, AdvertisingCardsRow } from "./molecules";
import styles from "./headersection.module.scss";

const HeaderSection: FC = () => (
  <section className={styles.headerSection}>
    <UserActionArticle />
    <AdvertisingCardsRow />
  </section>
);

export default HeaderSection;
