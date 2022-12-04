import { FullScreenContext } from "contexts/full-screen.context";
import React, { FC, useContext } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ServicesGridLayout: FC = ({ children }) => {
  const {
    screen: { active },
  } = useContext(FullScreenContext);
  const layout = {
    lg: [
      {
        i: "current-services",
        x: 0,
        y: 0,
        w: 1,
        h: active ? 4 : 3,
        isResizable: false,
      },
      {
        i: "future-services",
        x: 1,
        y: 0,
        w: 2,
        h: 3.5,
        isResizable: false,
      },
      {
        i: "available-services",
        x: 1,
        y: 1,
        w: 2,
        h: 3.5,
        isResizable: false,
      },
      {
        i: "past-services",
        x: 3,
        y: 0,
        w: 1,
        h: active ? 8 : 7,
        isResizable: false,
      },
      {
        i: "paychecks",
        x: 0,
        y: 1,
        w: 1,
        h: 4,
        isResizable: false,
      },
    ],
  };
  return (
    <ResponsiveGridLayout
      layouts={layout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4 }}
      rowHeight={80}
      width={active ? 1920 : 1200}
    >
      {children}
    </ResponsiveGridLayout>
  );
};

export default ServicesGridLayout;
