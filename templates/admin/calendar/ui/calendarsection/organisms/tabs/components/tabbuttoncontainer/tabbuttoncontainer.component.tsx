import React, { FC } from "react";
import { TabBackButton, TabNextButton } from "..";
import { TabNextButtonProps } from "../tabnextbutton/tabnextbutton.component";
import styles from "../styles.module.scss";

type TabButtonContainerProps = TabNextButtonProps;

const TabButtonContainer: FC<TabButtonContainerProps> = ({
  index,
  ...rest
}) => (
  <div className={styles.tabButtonContainer}>
    <TabNextButton {...rest} index={index} />
    <TabBackButton index={index} />
  </div>
);

export default TabButtonContainer;
