import { createContext, Dispatch, FC, SetStateAction } from "react";
import { Services } from "../types";

interface ServicesContextInterface {
  sessionId: number | undefined;
  services: Services;
  setServices: Dispatch<SetStateAction<Services>>;
}

export const ServicesContext = createContext({} as ServicesContextInterface);

export const ServicesContextProvider: FC<ServicesContextInterface> = ({
  sessionId,
  services,
  setServices,
  children,
}) => (
  <ServicesContext.Provider
    value={{
      sessionId,
      services,
      setServices,
    }}
  >
    {children}
  </ServicesContext.Provider>
);
