import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Client } from "pages/coordinator/calendar";
import { FC } from "react";

type Tab1Props = {
  clients: Client[];
  goStepBack(): void;
  onClick(element: Client | undefined): void;
};

export const Tab1: FC<Tab1Props> = ({ clients, goStepBack, onClick }) => {
  let clientDropdown: DropDownListComponent | null;
  const findClient = (personalData: string) =>
    clients.find(
      (client) =>
        `${client.uzytkownicy.Imie} ${client.uzytkownicy.Nazwisko}` ===
        personalData
    );
  return (
    <div className="responsive-align">
      <div className="row">
        <label className="e-textlabel">Wybierz klienta</label>
        <DropDownListComponent
          ref={(dropdownlist) => {
            clientDropdown = dropdownlist;
          }}
          dataSource={clients.map(
            (client) =>
              `${client.uzytkownicy.Imie} ${client.uzytkownicy.Nazwisko}`
          )}
          placeholder="Klient"
        />
      </div>
      <div className="btn-container">
        <button id="goToSearch" className="e-btn" onClick={goStepBack}>
          Wróć
        </button>
        <button
          id="client"
          className="e-btn"
          onClick={() => {
            const client = findClient(clientDropdown?.value as string);
            onClick(client);
          }}
        >
          Dalej
        </button>
      </div>
      <span id="err1" />
    </div>
  );
};
