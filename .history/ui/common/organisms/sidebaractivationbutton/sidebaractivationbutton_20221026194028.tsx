import { useContext } from "react";

const SidebarActivationButton = () => {
  const { active, setActive } = useContext(SidebarContext);
  return (
    <button
      className="openbtn"
      onClick={(active) => setActive(!!active)}
      style={{
        position: "absolute",
        top: "50%",
        left: "-5%",
        zIndex: 1,
        borderRadius: "50%",
      }}
    >
      Open Sidebar
    </button>
  );
};

export default SidebarActivationButton;
