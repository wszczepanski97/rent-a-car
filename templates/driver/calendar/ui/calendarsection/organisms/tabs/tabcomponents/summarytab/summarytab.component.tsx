import { FC, useContext } from "react";
import { TabBackButton, TabContainer, TabTitle } from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
import { RelocationType } from "../relocationtypetab/relocationtypetab.component";
export const SummaryTab: FC = () => {
  const {
    selectedRentId,
    serviceDescription,
    setServiceDescription,
    selectedRelocationType,
    selectedCarPickupLocation,
    pickupEstimationTime,
    deliveryEstimationTime,
    selectedCarDeliverLocation,
  } = useContext(AddEventContext);
  return (
    <TabContainer>
      <form style={{ width: "100%", height: "100%" }}>
        <TabTitle title="Podsumowanie zlecenia usługi" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 0",
              alignItems: "center",
            }}
          >
            <label
              className="e-textlabel"
              style={{ fontSize: "16px", fontWeight: 700 }}
            >
              Wypożyczenie
            </label>
            <span style={{ textOverflow: "ellipsis", fontSize: "14px" }}>
              {selectedRentId}
            </span>
          </div>
          {selectedRelocationType === RelocationType.PODSTAWIENIE && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                  alignItems: "center",
                }}
              >
                <label
                  className="e-textlabel"
                  style={{ fontSize: "16px", fontWeight: 700 }}
                >
                  Lokalizacja - podstawienie
                </label>
                <span style={{ textOverflow: "ellipsis", fontSize: "14px" }}>
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
                  alignItems: "center",
                }}
              >
                <label
                  className="e-textlabel"
                  style={{ fontSize: "16px", fontWeight: 700 }}
                >
                  Szacowany czas dojazdu - podstawienie
                </label>
                <span style={{ textOverflow: "ellipsis", fontSize: "14px" }}>
                  {pickupEstimationTime ? `${pickupEstimationTime}h` : "-"}
                </span>
              </div>
            </div>
          )}
          {selectedRelocationType === RelocationType.ODBIOR && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0",
                  alignItems: "center",
                }}
              >
                <label
                  className="e-textlabel"
                  style={{ fontSize: "16px", fontWeight: 700 }}
                >
                  Lokalizacja - podstawienie
                </label>
                <span style={{ textOverflow: "ellipsis", fontSize: "14px" }}>
                  {selectedCarDeliverLocation
                    ? `${selectedCarDeliverLocation?.Miejscowosc} ${selectedCarDeliverLocation?.Ulica} ${selectedCarDeliverLocation?.NumerUlicy}`
                    : "-"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 0",
                }}
              >
                <label
                  className="e-textlabel"
                  style={{ fontSize: "16px", fontWeight: 700 }}
                >
                  Szacowany czas dojazdu - odbiór
                </label>
                <span style={{ textOverflow: "ellipsis", fontSize: "14px" }}>
                  {deliveryEstimationTime ? `${deliveryEstimationTime}h` : "-"}
                </span>
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 0",
              width: "100%",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "16px", fontWeight: 700 }}>Opis</label>
            <span style={{ textOverflow: "ellipsis", fontSize: "14px" }}>
              {serviceDescription || "Brak opisu"}
            </span>
          </div>
        </div>
      </form>
      <TabBackButton
        index={4}
        onBackClick={() => {
          setServiceDescription(undefined);
        }}
      />
    </TabContainer>
  );
};

export default SummaryTab;
