import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import { CalendarContext } from "../contexts/calendar.context";

export function useCalendar() {
  const { mechanic, cars, services } = useContext(CalendarContext);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/mechanic/calendar`, {
    fallbackData: {
      mechanic,
      cars,
      services,
    },
    fetcher,
    revalidateOnMount: true,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(`/api/mechanic/calendar`),
  };
}
