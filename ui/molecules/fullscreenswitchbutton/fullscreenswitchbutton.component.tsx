import { FullScreenContext } from "contexts/full-screen.context";
import { useContext } from "react";
import { WindowDesktop, WindowFullscreen } from "react-bootstrap-icons";
import styles from "./fullscreenswitchbutton.module.scss";

const FullScreenSwitchButton = () => {
  const { screen } = useContext(FullScreenContext);
  return (
    <div
      className={styles.fullScreenSwitchButtonContainer}
      onClick={screen.active ? screen.exit : screen.enter}
    >
      {screen.active ? (
        <WindowDesktop size={30} />
      ) : (
        <WindowFullscreen size={30} />
      )}
    </div>
  );
};

export default FullScreenSwitchButton;
