import { FC, useContext } from "react";
import { NavbarList, PageTitle } from "./ui";
import styles from "./navbar.module.scss";
import { FullScreenContext } from "contexts/full-screen-context";

const Navbar: FC = () => {
  const { screen } = useContext(FullScreenContext);
  return screen.active ? (
    <button onClick={screen.active ? screen.exit : screen.enter}>
      {screen.active ? "Desktop" : "Fullscreen"}
    </button>
  ) : (
    <nav className={styles.Navbar}>
      <PageTitle />
      <NavbarList />
    </nav>
  );
};

export default Navbar;
