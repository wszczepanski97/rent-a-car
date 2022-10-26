import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import styles from "./navbar.module.scss";
import { NavbarList, PageTitle } from "./ui";

const Navbar: FC = () => {
  const { active: sidebarActive } = useContext(SidebarContext);
  return sidebarActive ? (
    <nav className={styles.Navbar}>
      <PageTitle />
      <NavbarList />
    </nav>
  ) : null;
};
export default Navbar;
