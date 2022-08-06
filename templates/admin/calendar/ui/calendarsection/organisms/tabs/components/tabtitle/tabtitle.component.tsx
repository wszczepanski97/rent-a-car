import React, { FC } from "react";

type TabTitleProps = {
  title: string;
  marginBottom?: number;
};

const TabTitle: FC<TabTitleProps> = ({ title, marginBottom }) => {
  return (
    <h4 className="e-textlabel" style={{ marginBottom }}>
      {title}
    </h4>
  );
};

export default TabTitle;
