import { createContext, FC } from "react";
import { Services } from "../types";

interface ServicesContextInterface {
  sessionId: number | undefined;
  services: Services;
}

export const ServicesContext = createContext({} as ServicesContextInterface);

export const ServicesContextProvider: FC<ServicesContextInterface> = ({
  sessionId,
  services,
  children,
}) => (
  <ServicesContext.Provider
    value={{
      sessionId,
      services,
    }}
  >
    {children}
  </ServicesContext.Provider>
);
