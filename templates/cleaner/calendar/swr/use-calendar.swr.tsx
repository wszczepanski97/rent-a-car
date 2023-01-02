import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import { CalendarContext } from "../contexts/calendar.context";

export function useCalendar() {
  const { cleaner, cars, services } = useContext(CalendarContext);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/cleaner/calendar`, {
    fallbackData: {
      cleaner,
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
    mutate: () => mutate(`/api/cleaner/calendar`),
  };
}
