import { CalendarMechanicPageProps } from "pages/mechanic/calendar";
import { createContext, FC } from "react";

export const CalendarContext = createContext({} as CalendarMechanicPageProps);

export const CalendarContextProvider: FC<CalendarMechanicPageProps> = ({
  mechanic,
  cars,
  services,
  children,
}) => (
  <CalendarContext.Provider value={{ mechanic, cars, services }}>
    {children}
  </CalendarContext.Provider>
);
