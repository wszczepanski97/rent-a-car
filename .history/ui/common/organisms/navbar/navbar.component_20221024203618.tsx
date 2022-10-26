import { FullScreenContext } from "contexts/full-screen-context";
import { FC, useContext } from "react";
import styles from "./navbar.module.scss";
import { NavbarList, PageTitle } from "./ui";

const Navbar: FC = () => {
  const { screen } = useContext(FullScreenContext);
  return screen.active ? null : (
    <div className={styles.Navbar}>
      <PageTitle />
      <NavbarList />
    </div>
  );
};

export default Navbar;
