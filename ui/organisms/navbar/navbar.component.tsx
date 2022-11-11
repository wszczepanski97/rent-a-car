import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import NavbarList from "./components/navbarlist";
import PageTitle from "./components/pagetitle";
import styles from "./navbar.module.scss";

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
