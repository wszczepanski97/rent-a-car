import { createContext, FC } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FullScreenSwitchButton } from "ui";

type SidebarContextValues = { active: boolean };

export const SidebarContext = createContext<SidebarContextValues>(
  {} as SidebarContextValues
);

export const FullScreenContextProvider: FC = ({ children }) => {
  const screen = useFullScreenHandle();
  return (
    <FullScreenContext.Provider value={{ screen }}>
      <FullScreen handle={screen}>
        {children}
        <FullScreenSwitchButton />
      </FullScreen>
    </FullScreenContext.Provider>
  );
};
