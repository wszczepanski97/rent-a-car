import { useCycle } from "framer-motion";
import { createContext, FC } from "react";

type SidebarContextValues = {
  open: boolean;
  cycleOpen: (i?: number) => void;
};

export const SidebarContext = createContext<SidebarContextValues>(
  {} as SidebarContextValues
);

export const SidebarContextProvider: FC = ({ children }) => {
  const [open, cycleOpen] = useCycle(false, true);
  return (
    <SidebarContext.Provider value={{ open, cycleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
