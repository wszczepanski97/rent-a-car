import React, { FC } from "react";
import { TabBackButton, TabNextButton } from "..";
import { TabNextButtonProps } from "../tabnextbutton/tabnextbutton.component";
import styles from "../styles.module.scss";

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
