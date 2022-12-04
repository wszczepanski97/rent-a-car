import { FullScreenContext } from "contexts/full-screen.context";
import React, { FC, useContext } from "react";

const ServicesGridContainer: FC = ({ children }) => {
  const {
    screen: { active },
  } = useContext(FullScreenContext);
  return (
    <div
      style={{
        padding: 6,
        backgroundColor: "#e7e7e7",
        borderRadius: 10,
        height: active ? "calc(100vh - var(--navbar-height))" : "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default ServicesGridContainer;
