import { FC, useContext } from "react";
import { TabBackButton, TabContainer, TabTitle } from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
export const SummaryTab: FC = () => {
  const {
    selectedCar,
    selectedRepairType,
    selectedDateTimeRange,
    serviceDescription,
    setServiceDescription,
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
              width: "100%",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "16px", fontWeight: 700 }}>
              Typ usługi
            </label>
            <span style={{ fontSize: "14px" }}>Mycie</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 0",
              width: "100%",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "16px", fontWeight: 700 }}>
              Samochód
            </label>
            <span style={{ fontSize: "14px" }}>
              {selectedCar?.Marka} {selectedCar?.Model}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 0",
              width: "100%",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "16px", fontWeight: 700 }}>Czas</label>
            <span style={{ fontSize: "14px" }}>
              {selectedDateTimeRange?.startDateValue.toLocaleString()} -{" "}
              {selectedDateTimeRange?.endDateValue.toLocaleString()}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 0",
              width: "100%",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "16px", fontWeight: 700 }}>
              Typ naprawy
            </label>
            <span style={{ fontSize: "14px" }}>{selectedRepairType}</span>
          </div>
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
