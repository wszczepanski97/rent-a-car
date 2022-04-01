import { FC } from "react";
import { NavbarList, PageTitle } from "./ui";
import styles from "./navbar.module.scss";

const Navbar: FC = () => (
  <nav className={styles.Navbar}>
    <PageTitle />
    <NavbarList />
  </nav>
);

export default Navbar;
