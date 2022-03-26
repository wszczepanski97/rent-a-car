import styles from "./navbarlist.module.css";
import { NavbarListItem, NavbarListIcon } from "./atoms";

const NavbarList = () => (
  <ul className={styles.NavbarList}>
    <div style={{ display: "flex", gap: "32px" }}>
      <div style={{ display: "flex", gap: "39px" }}>
        <NavbarListItem name="Home" href="/" />
        <NavbarListItem name="Rent a car" href="/login" />
        <NavbarListItem name="Pricing" href="/pricing" />
        <NavbarListItem name="Admin Panel" href="/admin" />
      </div>
      <div style={{ display: "flex", gap: "142px" }}>
        <div style={{ display: "flex", gap: "18px" }}>
          <NavbarListIcon src="/images/SearchIcon.svg" alt="SearchIcon" />
          <NavbarListIcon src="/images/BasketIcon.svg" alt="BasketIcon" />
        </div>
        <NavbarListIcon src="/images/MenuIcon.svg" alt="MenuIcon" />
      </div>
    </div>
  </ul>
);

export default NavbarList;
