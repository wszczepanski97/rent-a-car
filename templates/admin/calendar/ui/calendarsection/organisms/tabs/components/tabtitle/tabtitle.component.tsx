import React, { FC } from "react";

type TabTitleProps = {
  title: string;
};

const TabTitle: FC<TabTitleProps> = ({ title }) => {
  return <h4 className="e-textlabel">{title}</h4>;
};

export default TabTitle;
