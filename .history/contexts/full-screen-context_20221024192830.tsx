import { createContext, FC } from "react";
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";
import { FullScreenSwitchButton } from "ui";

type FullScreenContextValues = { screen: FullScreenHandle };

export const FullScreenContext = createContext<FullScreenContextValues>(
  {} as FullScreenContextValues
);

export const FullScreenContextProvider: FC = ({ children }) => {
  const screen = useFullScreenHandle();
  return (
    <FullScreenContext.Provider value={{ screen }}>
      <FullScreen handle={screen}>
        <div
          style={{
            height: "100%",
            backgroundColor: "var(--dark-background-color)",
          }}
        >
          {children}
        </div>
        <FullScreenSwitchButton />
      </FullScreen>
    </FullScreenContext.Provider>
  );
};
