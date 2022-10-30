import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import styles from "./main.module.scss";

const Main: FC = ({ children }) => {
  const { open } = useContext(SidebarContext);
  const stylesWithSidebar = {
    display: "grid",
    gridTemplateColumns: open ? "15em 1fr" : "0 1fr",
  };
  return (
    <main style={open ? stylesWithSidebar : undefined} className={styles.main}>
      {children}
    </main>
  );
};

export default Main;
