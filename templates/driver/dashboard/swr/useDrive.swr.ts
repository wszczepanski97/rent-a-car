import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ServicesContext } from "../context/dashboard.context";

export function useDrive() {
  const { services, sessionId } = useContext(ServicesContext);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/drive?id=${sessionId}`, {
    fallbackData: services,
    fetcher,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(`/api/drive?id=${sessionId}`),
  };
}
