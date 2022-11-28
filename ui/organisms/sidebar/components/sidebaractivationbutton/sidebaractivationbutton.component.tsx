import ChevronsLeftSVG from "boxiconsvgs/ChevronsLeftSVG.component";
import ChevronsRightSVG from "boxiconsvgs/ChevronsRightSVG.component";
import { SidebarContext } from "contexts/sidebar.context";
import { useContext } from "react";
import styles from "./sidebaractivationbutton.module.scss";

const SidebarActivationButton = () => {
  const { open, cycleOpen } = useContext(SidebarContext);
  return (
    <>
      <div
        className={styles.sidebarActivationButtonWrapper}
        style={
          open
            ? {
                left: 185,
                background:
                  "linear-gradient(90deg, transparent 50%, var(--dark-background-color) 50%)",
              }
            : undefined
        }
      >
        <div
          className={styles.sidebarActivationButton}
          //@ts-ignore
          onClick={cycleOpen}
        >
          {open ? <ChevronsLeftSVG /> : <ChevronsRightSVG />}
        </div>
      </div>
    </>
  );
};

export default SidebarActivationButton;
