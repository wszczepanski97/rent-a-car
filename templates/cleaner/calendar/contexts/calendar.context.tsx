import { CalendarCleanerPageProps } from "pages/cleaner/calendar";
import { createContext, FC } from "react";

export const CalendarContext = createContext({} as CalendarCleanerPageProps);

export const CalendarContextProvider: FC<CalendarCleanerPageProps> = ({
  cleaner,
  cars,
  services,
  children,
}) => (
  <CalendarContext.Provider value={{ cleaner, cars, services }}>
    {children}
  </CalendarContext.Provider>
);
