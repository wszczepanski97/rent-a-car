import { useWash } from "../../../../swr/useWash.swr";
import ServicesGridCardInfo from "../../components/servicesgridcard/components/servicesgridcardinfo";
import ServicesGridCard from "../../components/servicesgridcard/servicesgridcard.component";
import Button from "./components/button";
import ButtonContainer from "./components/buttoncontainer";
import Property from "./components/property";
import styles from "./currentservicegridcard.module.scss";

const CurrentServiceGridCard = () => {
  const { data, isError, isLoading, mutate } = useWash();
  if (!data.currentservice)
    return (
      <ServicesGridCard title="Obecne mycie">
        <ServicesGridCardInfo statement="Nie masz żadnych trwających myć" />
      </ServicesGridCard>
    );
  const { IdUslugi, IdUszkodzenia, DataDo, Samochod } = data.currentservice;
  const handleWash = async (type: string) => {
    await fetch(`/api/wash`, {
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
    <ServicesGridCard title="Obecne mycie">
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
              onClick={async () => await handleWash("FINISH")}
              text="Zakończ"
            />
            <Button
              bgColor="var(--login-button-background)"
              onClick={async () => await handleWash("UNASSIGN")}
              disabled={new Date(data.currentservice.DataOd) < new Date()}
              text="Odepnij"
            />
            <Button
              bgColor="red"
              onClick={async () => await handleWash("DELETE")}
              text="Anuluj"
            />
          </ButtonContainer>
        </div>
      ) : (
        <ServicesGridCardInfo statement="Nie masz żadnych trwających myć" />
      )}
    </ServicesGridCard>
  );
};

export default CurrentServiceGridCard;
