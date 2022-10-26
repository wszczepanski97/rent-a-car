import { FC, useContext } from "react";
import { NavbarList, PageTitle } from "./ui";
import styles from "./navbar.module.scss";
import { FullScreenContext } from "contexts/full-screen-context";

const Navbar: FC = () => {
  const { screen } = useContext(FullScreenContext);
  return screen.active ? null : (
    <vi className={styles.Navbar}>
      <PageTitle />
      <NavbarList />
    </vi>
  );
};

export default Navbar;
