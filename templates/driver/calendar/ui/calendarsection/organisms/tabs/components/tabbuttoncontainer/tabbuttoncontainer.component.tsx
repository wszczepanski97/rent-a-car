import { FC, useContext } from "react";
import { TabBackButton, TabNextButton } from "..";
import { AddEventContext } from "../../contexts/addevent.context";
import styles from "../styles.module.scss";
import { TabNextButtonProps } from "../tabnextbutton/tabnextbutton.component";

type TabButtonContainerProps = TabNextButtonProps & {
  onBackClick: () => void | undefined;
};

const TabButtonContainer: FC<TabButtonContainerProps> = ({
  index,
  onBackClick,
  ...rest
}) => {
  const { currentTab } = useContext(AddEventContext);
  return (
    <div className={styles.tabButtonContainer}>
      <TabNextButton {...rest} index={index} />
      {currentTab?.current?.selectedItem !== 0 && (
        <TabBackButton index={index} onBackClick={onBackClick} />
      )}
    </div>
  );
};

export default TabButtonContainer;
