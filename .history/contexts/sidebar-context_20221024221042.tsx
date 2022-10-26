import { createContext, FC, useState } from "react";
import { FullScreen } from "react-full-screen";
import { FullScreenSwitchButton } from "ui";

type SidebarContextValues = { active: boolean };

export const SidebarContext = createContext<SidebarContextValues>(
  {} as SidebarContextValues
);

export const SidebarContextProvider: FC = ({ children }) => {
  const [active, setActive] = useState(false);
  return (
    <SidebarContext.Provider value={{ screen }}>
      <FullScreen handle={screen}>
        {children}
        <FullScreenSwitchButton />
      </FullScreen>
    </SidebarContext.Provider>
  );
};
