import { FC, useContext } from "react";
import { TabBackButton, TabContainer, TabTitle } from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
export const SummaryTab: FC = () => {
  const {
    selectedService,
    selectedClient,
    selectedCar,
    selectedEmployee,
    selectedDateTimeRange,
    serviceDescription,
    priceForService,
    setPriceForService,
  } = useContext(AddEventContext);
  setPriceForService(
    (selectedCar?.CenaZaGodzine as number) *
      (Math.abs(
        (selectedDateTimeRange?.endDateValue as unknown as number) -
          (selectedDateTimeRange?.startDateValue as unknown as number)
      ) /
        36e5)
  );
  return (
    <TabContainer height={350}>
      <form style={{ width: "100%" }}>
        <TabTitle title="Podsumowanie zlecenia usługi" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 50,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Typ usługi</label>
              <span>{selectedService}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Klient</label>
              <span>
                {selectedClient?.uzytkownicy.Imie}{" "}
                {selectedClient?.uzytkownicy.Nazwisko}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Samochód</label>
              <span>
                {selectedCar?.Marka} {selectedCar?.Model}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Czas</label>
              <span>
                {selectedDateTimeRange?.startDateValue.toLocaleString()} -{" "}
                {selectedDateTimeRange?.endDateValue.toLocaleString()}
              </span>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Pracownik</label>
              <span>
                {selectedEmployee
                  ? `${selectedEmployee?.uzytkownicy.Imie} ${selectedEmployee?.uzytkownicy.Nazwisko}`
                  : "-"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Cena</label>
              <span>{priceForService}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
                textOverflow: "ellipsis",
              }}
            >
              <label className="e-textlabel">Opis</label>
              <span style={{ textOverflow: "ellipsis" }}>
                {serviceDescription || "Brak opisu"}
              </span>
            </div>
          </div>
        </div>
      </form>
      <TabBackButton index={6} />
    </TabContainer>
  );
};

export default SummaryTab;
