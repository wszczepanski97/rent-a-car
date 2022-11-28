import { FC } from "react";
import { TabBackButton, TabNextButton } from "..";
import styles from "../styles.module.scss";
import { TabNextButtonProps } from "../tabnextbutton/tabnextbutton.component";

type TabButtonContainerProps = TabNextButtonProps & {
  onBackClick: () => void | undefined;
};

const TabButtonContainer: FC<TabButtonContainerProps> = ({
  index,
  onBackClick,
  ...rest
}) => (
  <div className={styles.tabButtonContainer}>
    <TabNextButton {...rest} index={index} />
    <TabBackButton index={index} onBackClick={onBackClick} />
  </div>
);

export default TabButtonContainer;
