import { lokalizacje } from "@prisma/client";
import { FC, useCallback, useContext, useRef } from "react";
import { TabButtonContainer, TabContainer, TabTitle } from "../../components";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";

type RelocationDetailsTabProps = { locations: lokalizacje[] };

const RelocationDetailsTab: FC<RelocationDetailsTabProps> = ({ locations }) => {
  let carPickupLocationDropdown = useRef<HTMLSelectElement | null>(null);
  let carDeliverLocationDropdown = useRef<HTMLSelectElement | null>(null);
  const {
    currentTab,
    selectedRent,
    selectedRelocationType,
    pickupEstimationTime,
    setPickupEstimationTime,
    deliveryEstimationTime,
    setDeliveryEstimationTime,
    setSelectedCarPickupLocation,
    setSelectedCarDeliverLocation,
    setSelectedRelocationType,
  } = useContext(AddEventContext);

  const onCustomOnNextButtonClick = () => {
    const pickupLocation = locations?.find(
      (location: lokalizacje) =>
        `${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}` ===
        carPickupLocationDropdown?.current?.value
    );
    const deliverLocation = locations?.find(
      (location: lokalizacje) =>
        `${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}` ===
        carDeliverLocationDropdown?.current?.value
    );

    const errPickLocElement = document.getElementById("pickup-loc-err");
    const errDelLocElement = document.getElementById("deliver-loc-err");
    if (selectedRelocationType === "Podstawienie" && !pickupLocation) {
      if (errPickLocElement) {
        errPickLocElement.innerText =
          "Proszę wybrać lokalizację do podstawienia auta";
      }
    } else if (selectedRelocationType === "Odbior" && !deliverLocation) {
      if (errDelLocElement) {
        errDelLocElement.innerText =
          "Proszę wybrać lokalizację do odbioru auta";
      }
    } else {
      setSelectedCarPickupLocation(pickupLocation);
      setSelectedCarDeliverLocation(deliverLocation);
      if (errPickLocElement) errPickLocElement.innerText = "";
      if (errDelLocElement) errDelLocElement.innerText = "";
      removeItem(currentTab);
      currentTab?.current?.enableTab(3, true);
      currentTab?.current?.enableTab(2, false);
    }
  };

  const onPickupEstimationTimeChange = useCallback(
    (e) => {
      setPickupEstimationTime(e.target.value);
    },
    [setPickupEstimationTime]
  );

  const onDeliveryEstimationTimeChange = useCallback(
    (e) => {
      setDeliveryEstimationTime(e.target.value);
    },
    [setDeliveryEstimationTime]
  );

  return (
    <TabContainer height={500} width={600}>
      <TabTitle
        title={
          selectedRelocationType === "Podstawienie"
            ? "Wybierz pracownika do podstawienia auta"
            : "Wybierz pracownika do odbioru auta"
        }
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {selectedRelocationType === "Podstawienie" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="e-textlabel" style={{ fontSize: 14 }}>
              Podstawienie auta
            </label>
            <span
              id={`pickup-loc-err`}
              style={{ color: "red", fontSize: "14px" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="e-textlabel">
                Szacowany czas dojazdu (w godzinach)
              </label>
              <input
                type="number"
                min="0.5"
                max="4"
                step="0.5"
                value={pickupEstimationTime}
                onChange={onPickupEstimationTimeChange}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="e-textlabel" style={{ paddingTop: 3 }}>
                Lokalizacja podstawienia
              </label>
              <select
                style={{ padding: "7px 5px" }}
                ref={carPickupLocationDropdown}
              >
                {locations.map((location: lokalizacje) => (
                  <option
                    key={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                    value={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                  >
                    {location.Miejscowosc} {location.Ulica}{" "}
                    {location.NumerUlicy}
                  </option>
                ))}
              </select>
            </div>
            <i style={{ fontSize: 14, textDecoration: "underline" }}>
              Pamiętaj, wypożyczenie rozpoczyna się o godzinie:
              {selectedRent?.uslugi.DataOd}
            </i>
            <i style={{ fontSize: 14, textDecoration: "underline" }}>
              Jest to czas w którym powinieneś znaleźć się na miejscu.
            </i>
          </div>
        )}
        {selectedRelocationType === "Odbior" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="e-textlabel" style={{ fontSize: 14 }}>
              Odbiór auta
            </label>
            <span
              id={`deliver-loc-err`}
              style={{ color: "red", fontSize: "14px" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="e-textlabel">
                Szacowany czas dojazdu (w godzinach)
              </label>
              <input
                type="number"
                min="0.5"
                max="4"
                step="0.5"
                defaultValue="0.5"
                value={deliveryEstimationTime}
                onChange={onDeliveryEstimationTimeChange}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="e-textlabel" style={{ paddingTop: 3 }}>
                  Lokalizacja odbioru
                </label>
                <select
                  style={{ padding: "7px 5px" }}
                  ref={carDeliverLocationDropdown}
                >
                  {locations.map((location: lokalizacje) => (
                    <option
                      key={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                      value={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                    >
                      {location.Miejscowosc} {location.Ulica}{" "}
                      {location.NumerUlicy}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={onCustomOnNextButtonClick}
        index={2}
        onBackClick={() => {
          setSelectedRelocationType(undefined);
        }}
      />
    </TabContainer>
  );
};

export default RelocationDetailsTab;
