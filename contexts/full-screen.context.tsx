import type { FC } from "react";
import { createContext } from "react";
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";
import FullScreenSwitchButton from "ui/molecules/fullscreenswitchbutton";

type FullScreenContextValues = { screen: FullScreenHandle };

export const FullScreenContext = createContext<FullScreenContextValues>(
  {} as FullScreenContextValues
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
