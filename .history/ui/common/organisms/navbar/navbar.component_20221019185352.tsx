import { FC, useContext } from "react";
import { NavbarList, PageTitle } from "./ui";
import styles from "./navbar.module.scss";
import { FullScreenContext } from "contexts/full-screen-context";

const Navbar: FC = () => {
  const { screen } = useContext(FullScreenContext);
  return screen.active ? null : (
    <nav className={styles.Navbar}>
      <PageTitle />
      <NavbarList />
    </nav>
  );
};

export default Navbar;
