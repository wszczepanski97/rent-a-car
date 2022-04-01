import { FC } from "react";
import { NavbarListItem, NavbarListIcon } from "./atoms";
import styles from "./navbarlist.module.scss";

const NavbarList: FC = () => (
  <ul className={styles.navbarList}>
    <div className={styles.navbarListContainer}>
      <div className={styles.navbarListItemGroup}>
        <NavbarListItem name="Home" href="/" />
        <NavbarListItem name="Rent a car" href="/login" />
        <NavbarListItem name="Pricing" href="/pricing" />
        <NavbarListItem name="Admin Panel" href="/admin" />
      </div>
      <div className={styles.navbarListIconGroup}>
        <NavbarListIcon src="/images/SearchIcon.svg" alt="SearchIcon" />
        <NavbarListIcon src="/images/BasketIcon.svg" alt="BasketIcon" />
      </div>
    </div>
  </ul>
);

export default NavbarList;
