import { useSession } from "next-auth/react";
import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ServicesContext } from "../context/dashboard.context";

export function useRepair() {
  const { services, sessionId } = useContext(ServicesContext);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { mutate, cache } = useSWRConfig();
  console.log(cache);
  const { data, error } = useSWR(`/api/repair?id=${sessionId}`, {
    fallbackData: services,
    fetcher,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(`/api/repair?id=${sessionId}`),
  };
}
