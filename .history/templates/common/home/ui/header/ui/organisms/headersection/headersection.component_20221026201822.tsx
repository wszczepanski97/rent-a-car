import { SidebarContext } from "contexts/sidebar-context";
import { FC } from "react";
import styles from "./headersection.module.scss";
import { AdvertisingCardsRow, UserActionArticle } from "./molecules";

const HeaderSection: FC = () => {
  const { active } = useContext(SidebarContext);
  return (
    <section className={styles.headerSection} id="Ułatw swoje życie">
      <UserActionArticle />
      <AdvertisingCardsRow />
    </section>
  );
};

export default HeaderSection;
