import { FC } from "react";
import styles from "./navbar.module.scss";
import { NavbarList, PageTitle } from "./ui";

const Navbar: FC = () => {
  return (
    <nav className={styles.Navbar}>
      <PageTitle />
      <NavbarList />
    </nav>
  );
};
export default Navbar;
