import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Client } from "pages/coordinator/calendar";
import { FC, useState } from "react";

type Tab1Props = {
  clients: Client[];
  goStepBack(): void;
  onClick(element: Client | undefined): void;
};

export const Tab1: FC<Tab1Props> = ({ clients, goStepBack, onClick }) => {
  const [disabled, setDisabled] = useState(true);
  let clientDropdown: DropDownListComponent | null;
  const findClient = (personalData: string) =>
    clients.find(
      (client) =>
        `${client.uzytkownicy.Imie} ${client.uzytkownicy.Nazwisko}` ===
        personalData
    );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        width: 500,
        gap: 20,
        margin: "0 auto",
      }}
    >
      <h4 className="e-textlabel">Wybierz klienta</h4>
      <DropDownListComponent
        ref={(dropdownlist) => {
          clientDropdown = dropdownlist;
        }}
        dataSource={clients.map(
          (client) =>
            `${client.uzytkownicy.Imie} ${client.uzytkownicy.Nazwisko}`
        )}
        placeholder="Klient"
        onChange={() => {
          setDisabled(false);
        }}
      />
      <div
        className="btn-container"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10,
        }}
      >
        <button
          id="client"
          className="e-btn"
          onClick={() => {
            const client = findClient(clientDropdown?.value as string);
            onClick(client);
          }}
          style={{ backgroundColor: "#5aad73", border: 0 }}
          disabled={disabled}
        >
          Przejdź dalej
        </button>
        <button
          id="goToSearch"
          className="e-btn"
          onClick={goStepBack}
          style={{ backgroundColor: "#ff5757", border: 0 }}
        >
          Wróć
        </button>
      </div>
      <span id="err1" />
    </div>
  );
};
