import { SidebarContext } from "contexts/sidebar-context";
import { useContext } from "react";

const Main = () => {
  const { active, setActive } = useContext(SidebarContext);
  return (
    <main
      style={
        active
          ? {
              display: "grid",
              gridTemplateColumns: "15em 1fr",
              maxWidth: "100em",
              width: "90%",
              margin: "0 auto",
            }
          : undefined
      }
    ></main>
  );
};

export default Main;
