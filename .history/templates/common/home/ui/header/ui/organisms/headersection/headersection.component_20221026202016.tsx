import classnames from "classnames";
import { SidebarContext } from "contexts/sidebar-context";
import { FC } from "react";
import styles from "./headersection.module.scss";
import { AdvertisingCardsRow, UserActionArticle } from "./molecules";

const cx = classnames.bind(styles);

const HeaderSection: FC = () => {
  const { active } = useContext(SidebarContext);
  return (
    <section
      className={classnames(styles.headerSection, {
        [styles.articleButton_Active]: active,
      })}
      id="Ułatw swoje życie"
    >
      <UserActionArticle />
      <AdvertisingCardsRow />
    </section>
  );
};

export default HeaderSection;
