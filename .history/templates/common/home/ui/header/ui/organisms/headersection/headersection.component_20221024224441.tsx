import { FC } from "react";
import styles from "./headersection.module.scss";
import { AdvertisingCardsRow, UserActionArticle } from "./molecules";

const HeaderSection: FC = () => (
  <section className={styles.headerSection} id="Header Section">
    <UserActionArticle />
    <AdvertisingCardsRow />
  </section>
);

export default HeaderSection;
