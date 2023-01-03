import { CalendarDriverPageProps } from "pages/driver/calendar";
import { createContext, FC } from "react";

export const CalendarContext = createContext({} as CalendarDriverPageProps);

export const CalendarContextProvider: FC<CalendarDriverPageProps> = ({
  driver,
  cars,
  locations,
  services,
  children,
}) => (
  <CalendarContext.Provider value={{ driver, cars, locations, services }}>
    {children}
  </CalendarContext.Provider>
);
