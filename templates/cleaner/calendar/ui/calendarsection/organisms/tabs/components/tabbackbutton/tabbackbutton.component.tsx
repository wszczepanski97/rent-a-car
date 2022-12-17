import classnames from "classnames";
import { FC, useCallback, useContext } from "react";
import { AddEventContext } from "../../contexts/addevent.context";
import styles from "../styles.module.scss";

const cx = classnames.bind(styles);

type TabBackButtonProps = {
  index: number;
  onBackClick: () => void | undefined;
};

const TabBackButton: FC<TabBackButtonProps> = ({ index, onBackClick }) => {
  const { currentTab } = useContext(AddEventContext);
  const goStepBack = useCallback(() => {
    onBackClick?.();
    currentTab?.current?.enableTab(index - 1, true);
    currentTab?.current?.select(index - 1);
    currentTab?.current?.enableTab(index, false);
  }, []);
  return (
    <button
      id="goToSearch"
      className={cx("e-btn", styles.tabBackButton)}
      onClick={goStepBack}
    >
      Wróć
    </button>
  );
};

export default TabBackButton;
