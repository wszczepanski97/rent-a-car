import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ServicesContext } from "../context/dashboard.context";

export function useWash() {
  const { services, sessionId } = useContext(ServicesContext);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/wash?id=${sessionId}`, {
    fallbackData: services,
    fetcher,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(`/api/wash?id=${sessionId}`),
  };
}
