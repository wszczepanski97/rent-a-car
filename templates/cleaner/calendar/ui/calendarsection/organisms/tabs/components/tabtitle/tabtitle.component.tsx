import { FC } from "react";

type TabTitleProps = {
  title: string;
  marginBottom?: number;
};

const TabTitle: FC<TabTitleProps> = ({ title, marginBottom }) => {
  return (
    <h4
      className="e-textlabel"
      style={{ marginBottom, textAlign: "center", margin: 0 }}
    >
      {title}
    </h4>
  );
};

export default TabTitle;
