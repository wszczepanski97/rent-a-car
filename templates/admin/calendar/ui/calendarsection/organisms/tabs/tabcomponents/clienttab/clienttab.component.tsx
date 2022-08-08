import { FC, useContext, useRef, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Client } from "pages/coordinator/calendar";
import {
  TabContainer,
  TabDropdown,
  TabError,
  TabTitle,
} from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
import TabButtonContainer from "../../components/tabbuttoncontainer/tabbuttoncontainer.component";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";

type ClientTabProps = { clients: Client[] };

const ClientTab: FC<ClientTabProps> = ({ clients }) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { currentTab, selectedClient, setSelectedClient, setSelectedService } =
    useContext(AddEventContext);
  const [disabled, setDisabled] = useState(true);
  const onCustomOnNextButtonClick = () => {
    const errorElement = document.getElementById("err1");
    const client = clients.find(
      (client) =>
        `${client.uzytkownicy.Imie} ${client.uzytkownicy.Nazwisko}` ===
        dropdownRef?.current?.value
    );
    if (client) {
      if (errorElement) {
        errorElement.innerText = "";
      }
      removeItem(currentTab);
      currentTab?.current?.enableTab(2, true);
      currentTab?.current?.enableTab(1, false);
      setSelectedClient(client);
    } else {
      if (errorElement) {
        errorElement.innerText = "Proszę wybrać klienta";
      }
    }
  };
  return (
    <TabContainer>
      <TabTitle title="Wybierz klienta" />
      <TabError index={1} />
      <TabDropdown
        dataSource={clients.map(
          (client) =>
            `${client.uzytkownicy.Imie} ${client.uzytkownicy.Nazwisko}`
        )}
        dropdownRef={dropdownRef}
        placeholder="Klient"
        setDisabled={setDisabled}
        setSelectedProperty={setSelectedClient}
        value={selectedClient}
      />
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={onCustomOnNextButtonClick}
        disabled={!selectedClient}
        onBackClick={() => {
          setSelectedService(undefined);
        }}
        index={1}
      />
    </TabContainer>
  );
};

export default ClientTab;
