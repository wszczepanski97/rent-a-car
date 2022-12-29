import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import { CalendarContext } from "../contexts/calendar.context";

export function useCalendar() {
  const {
    additionalRentOptions,
    cars,
    clients,
    employees,
    insurances,
    locations,
    services,
  } = useContext(CalendarContext);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/coordinator/calendar`, {
    fallbackData: {
      additionalRentOptions,
      cars,
      clients,
      employees,
      insurances,
      locations,
      services,
    },
    fetcher,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(`/api/coordinator/calendar`),
  };
}
