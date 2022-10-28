import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import styles from "./navbar.module.scss";
import { NavbarList, PageTitle } from "./ui";

const Navbar: FC = () => {
  const { open } = useContext(SidebarContext);
  return (
    <nav className={styles.Navbar} style={{ display: open ? "none" : "flex" }}>
      <PageTitle />
      <NavbarList />
    </nav>
  );
};
export default Navbar;
