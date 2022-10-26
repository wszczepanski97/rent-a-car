import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";

const Main: FC = ({ children }) => {
  const { active } = useContext(SidebarContext);
  const stylesWithSidebar = {
    display: "grid",
    gridTemplateColumns: "15em 1fr",
    maxWidth: "100em",
    width: "90%",
    margin: "0 auto",
  };
  return <main style={active ? stylesWithSidebar : undefined}>{children}</main>;
};

export default Main;
