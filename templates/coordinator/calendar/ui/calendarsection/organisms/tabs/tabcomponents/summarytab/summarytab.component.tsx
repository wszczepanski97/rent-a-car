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
    selectedCarPickup,
    selectedCarPickupEmployee,
    selectedCarPickupLocation,
    pickupEstimationTime,
    selectedCarDeliver,
    selectedCarDeliverEmployee,
    selectedCarDeliverLocation,
    deliveryEstimationTime,
    selectedDateTimeRange,
    selectedInsurance,
    selectedAdditionalOptions,
    serviceDescription,
    priceForService,
    setSelectedCarPickup,
    setSelectedCarDeliver,
    setPickupEstimationTime,
    setDeliveryEstimationTime,
    setSelectedCarPickupLocation,
    setSelectedCarDeliverLocation,
    setSelectedCarPickupEmployee,
    setSelectedCarDeliverEmployee,
    setServiceDescription,
  } = useContext(AddEventContext);
  return (
    <TabContainer height={350} width={1000}>
      <form style={{ width: "100%" }}>
        <TabTitle title="Podsumowanie zlecenia usługi" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
                  {selectedClient?.uzytkownicy?.Imie}{" "}
                  {selectedClient?.uzytkownicy?.Nazwisko}
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
          {selectedService === UslugaType.WYPOŻYCZENIE && (
            <div>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                  textOverflow: "ellipsis",
                }}
              >
                <label className="e-textlabel">Ubezpieczenie</label>
                <span style={{ textOverflow: "ellipsis" }}>
                  {selectedInsurance?.Nazwa || "-"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                  textOverflow: "ellipsis",
                }}
              >
                <label className="e-textlabel">Dodatkowe opcje</label>
                {selectedAdditionalOptions?.map((option) => (
                  <span style={{ textOverflow: "ellipsis" }}>
                    {option?.Nazwa || "-"}
                  </span>
                ))}
              </div>
            </div>
          )}
          {selectedService === UslugaType.WYPOŻYCZENIE && selectedCarPickup && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                }}
              >
                <label className="e-textlabel">Pracownik - podstawienie</label>
                <span>
                  {selectedCarPickupEmployee
                    ? `${selectedCarPickupEmployee?.uzytkownicy?.Imie} ${selectedCarPickupEmployee?.uzytkownicy?.Nazwisko}`
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
                <label className="e-textlabel">
                  Lokalizacja - podstawienie
                </label>
                <span>
                  {selectedCarPickupLocation
                    ? `${selectedCarPickupLocation?.Miejscowosc} ${selectedCarPickupLocation?.Ulica} ${selectedCarPickupLocation?.NumerUlicy}`
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
                <label className="e-textlabel">
                  Szacowany czas dojazdu - podstawienie
                </label>
                <span>
                  {pickupEstimationTime ? `${pickupEstimationTime}h` : "-"}
                </span>
              </div>
            </div>
          )}
          {selectedService === UslugaType.WYPOŻYCZENIE && selectedCarDeliver && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                }}
              >
                <label className="e-textlabel">Pracownik - odbiór</label>
                <span>
                  {selectedCarDeliverEmployee
                    ? `${selectedCarDeliverEmployee?.uzytkownicy?.Imie} ${selectedCarDeliverEmployee?.uzytkownicy?.Nazwisko}`
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
                <label className="e-textlabel">
                  Lokalizacja - podstawienie
                </label>
                <span>
                  {selectedCarDeliverLocation
                    ? `${selectedCarDeliverLocation?.Miejscowosc} ${selectedCarDeliverLocation?.Ulica} ${selectedCarDeliverLocation?.NumerUlicy}`
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
                <label className="e-textlabel">
                  Szacowany czas dojazdu - odbiór
                </label>
                <span>
                  {deliveryEstimationTime ? `${deliveryEstimationTime}h` : "-"}
                </span>
              </div>
            </div>
          )}
          <div>
            {selectedService !== UslugaType.WYPOŻYCZENIE && (
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
                    ? `${selectedEmployee?.uzytkownicy?.Imie} ${selectedEmployee?.uzytkownicy?.Nazwisko}`
                    : "-"}
                </span>
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
            {selectedService !== UslugaType.WYPOŻYCZENIE && (
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
            )}
          </div>
        </div>
      </form>
      <TabBackButton
        index={6}
        onBackClick={() => {
          if (selectedService === UslugaType.WYPOŻYCZENIE) {
            setSelectedCarPickup(false);
            setSelectedCarDeliver(false);
            setPickupEstimationTime("0");
            setDeliveryEstimationTime("0");
            setSelectedCarPickupLocation(undefined);
            setSelectedCarDeliverLocation(undefined);
            setSelectedCarPickupEmployee(undefined);
            setSelectedCarDeliverEmployee(undefined);
          } else {
            setServiceDescription(undefined);
          }
        }}
      />
    </TabContainer>
  );
};

export default SummaryTab;
