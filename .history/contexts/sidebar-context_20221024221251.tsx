import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

type SidebarContextValues = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextValues>(
  {} as SidebarContextValues
);

export const SidebarContextProvider: FC = ({ children }) => {
  const [active, setActive] = useState(false);
  return (
    <SidebarContext.Provider value={{ active, setActive }}>
      {children}
    </SidebarContext.Provider>
  );
};
