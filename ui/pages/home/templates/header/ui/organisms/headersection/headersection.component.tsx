import { UserActionArticle, AdvertisingCardsRow } from "./molecules";
import styles from "./headersection.module.scss";
import { FC } from "react";

const HeaderSection: FC = () => (
  <section className={styles.headerSection}>
    <UserActionArticle />
    <AdvertisingCardsRow />
  </section>
);

export default HeaderSection;
