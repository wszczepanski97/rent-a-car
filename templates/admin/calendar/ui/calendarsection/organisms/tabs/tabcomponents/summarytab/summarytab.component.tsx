import { FC, useContext } from "react";
import { UslugaType } from "../../../add-event.component";
import { TabBackButton, TabContainer, TabTitle } from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
export const SummaryTab: FC = () => {
  const {
    selectedService,
    selectedClient,
    selectedCar,
    selectedRepairType,
    selectedWashingType,
    selectedEmployee,
    selectedDateTimeRange,
    serviceDescription,
    priceForService,
  } = useContext(AddEventContext);
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
            {selectedService === UslugaType.WYPOŻYCZENIE && (
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
            )}
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
            {selectedService === UslugaType.WYPOŻYCZENIE && (
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
            )}
            {selectedService === UslugaType.MYCIE && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                }}
              >
                <label className="e-textlabel">Typ mycia</label>
                <span>{selectedWashingType}</span>
              </div>
            )}
            {selectedService === UslugaType.NAPRAWA && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                }}
              >
                <label className="e-textlabel">Typ naprawy</label>
                <span>{selectedRepairType}</span>
              </div>
            )}
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
