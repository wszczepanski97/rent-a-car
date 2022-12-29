import { CalendarCoordinatorPageProps } from "pages/coordinator/calendar";
import { createContext, FC } from "react";

export const CalendarContext = createContext(
  {} as CalendarCoordinatorPageProps
);

export const CalendarContextProvider: FC<CalendarCoordinatorPageProps> = ({
  additionalRentOptions,
  cars,
  clients,
  employees,
  insurances,
  locations,
  services,
  children,
}) => (
  <CalendarContext.Provider
    value={{
      additionalRentOptions,
      cars,
      clients,
      employees,
      insurances,
      locations,
      services,
    }}
  >
    {children}
  </CalendarContext.Provider>
);
