import classnames from "classnames";
import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import styles from "./headersection.module.scss";
import { AdvertisingCardsRow, UserActionArticle } from "./molecules";

const HeaderSection: FC = () => {
  const { active } = useContext(SidebarContext);
  return (
    <section
      className={classnames(styles.headerSection, {
        [styles.sidebarActive]: active,
      })}
      id="Ułatw swoje życie"
    >
      <UserActionArticle />
      <AdvertisingCardsRow />
    </section>
  );
};

export default HeaderSection;
