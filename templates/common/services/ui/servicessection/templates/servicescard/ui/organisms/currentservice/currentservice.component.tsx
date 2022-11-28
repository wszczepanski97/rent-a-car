import { useSession } from "next-auth/react";
import { Service, ServicesContext } from "pages/mechanic/dashboard";
import { FC, useContext, useState } from "react";
import useSWR from "swr";

const CurrentService: FC<{ service: Service }> = ({
  service: { IdUszkodzenia, IdUslugi, DataOd, DataDo, Samochod },
}) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data: session } = useSession();
  const { services, setServices } = useContext(ServicesContext);
  const handleRepairCancelation = async () => {
    await fetch(`/api/repair`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IdUszkodzenia, IdUslugi }),
    });
    setShouldFetch(true);
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    shouldFetch ? `/api/repair?id=${session?.user.id}` : null,
    fetcher,
    { fallbackData: services }
  );
  if (data) {
    setServices(data);
  }
  return !data ? (
    <div>Loading...</div>
  ) : (
    <div>
      <span style={{ fontWeight: 700 }}>Data startu</span>
      <p>{new Date(DataOd).toLocaleString()}</p>
      <span style={{ fontWeight: 700 }}>Data zakończenia</span>
      <p>{new Date(DataDo).toLocaleString()}</p>
      <span style={{ fontWeight: 700 }}>Samochód</span>
      <p>{Samochod}</p>
      <button>Zakończ</button>
      <button disabled={shouldFetch} onClick={() => handleRepairCancelation()}>
        Anuluj
      </button>
    </div>
  );
};

export default CurrentService;
