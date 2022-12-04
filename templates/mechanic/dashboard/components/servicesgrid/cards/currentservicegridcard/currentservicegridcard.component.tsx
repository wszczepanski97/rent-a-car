import { useRepair } from "../../../../swr/useRepair.swr";
import ServicesGridCardInfo from "../../components/servicesgridcard/components/servicesgridcardinfo";
import ServicesGridCard from "../../components/servicesgridcard/servicesgridcard.component";
import Button from "./components/button";
import ButtonContainer from "./components/buttoncontainer";
import Property from "./components/property";
import styles from "./currentservicegridcard.module.scss";

const CurrentServiceGridCard = () => {
  const { data, isError, isLoading, mutate } = useRepair();
  if (!data.currentservice)
    return (
      <ServicesGridCard title="Obecna naprawa">
        <ServicesGridCardInfo statement="Nie masz żadnych trwających napraw" />
      </ServicesGridCard>
    );
  const { IdUslugi, IdUszkodzenia, DataDo, Samochod } = data.currentservice;
  const handleRepair = async (type: string) => {
    await fetch(`/api/repair`, {
      method: type === "DELETE" ? "DELETE" : "PUT",
      headers: { "Content-Type": "application/json" },
      body:
        type === "DELETE"
          ? JSON.stringify({
              IdUszkodzenia,
              IdUslugi,
            })
          : JSON.stringify({ IdUslugi, type }),
    });
    mutate();
  };
  if (isLoading) return <div>Trwa ładowanie...</div>;
  if (isError) return <div>Błąd...</div>;
  return (
    <ServicesGridCard title="Obecna naprawa">
      {data.currentservice ? (
        <div className={styles.container}>
          <Property
            name="Data startu"
            value={new Date(data.currentservice?.DataOd).toLocaleString()}
          />
          <Property
            name="Data zakończenia"
            value={new Date(DataDo).toLocaleString()}
          />
          <Property name="Samochód" value={Samochod} />
          <ButtonContainer>
            <Button
              bgColor="green"
              onClick={async () => await handleRepair("FINISH")}
              text="Zakończ"
            />
            <Button
              bgColor="var(--login-button-background)"
              onClick={async () => await handleRepair("UNASSIGN")}
              disabled={new Date(data.currentservice.DataOd) < new Date()}
              text="Odepnij"
            />
            <Button
              bgColor="red"
              onClick={async () => await handleRepair("DELETE")}
              text="Anuluj"
            />
          </ButtonContainer>
        </div>
      ) : (
        <ServicesGridCardInfo statement="Nie masz żadnych trwających napraw" />
      )}
    </ServicesGridCard>
  );
};

export default CurrentServiceGridCard;
