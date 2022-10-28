import { SidebarContext } from "contexts/sidebar-context";
import { useContext } from "react";

const SidebarActivationButton = () => {
  const { open, cycleOpen } = useContext(SidebarContext);
  return (
    <button
      className="openbtn"
      onClick={cycleOpen}
      style={{
        position: "absolute",
        top: "50%",
        left: "-5%",
        zIndex: 1,
        borderRadius: "50%",
      }}
    >
      {open ? "Close sidebar" : "Open sidebar"}
    </button>
  );
};

export default SidebarActivationButton;
