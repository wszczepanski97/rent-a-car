import { createContext, FC, useState } from "react";

type SidebarContextValues = { active: boolean };

export const SidebarContext = createContext<SidebarContextValues>(
  {} as SidebarContextValues
);

export const SidebarContextProvider: FC = ({ children }) => {
  const [active, setActive] = useState(false);
  return (
    <SidebarContext.Provider value={{ active }}>
      {children}
    </SidebarContext.Provider>
  );
};
