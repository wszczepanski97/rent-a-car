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
import { TabNextButtonType } from "../../components/tabnextbutton/tabnextbutton.component";

type ClientTabProps = { clients: Client[] };

const ClientTab: FC<ClientTabProps> = ({ clients }) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { setSelectedClient } = useContext(AddEventContext);
  const [disabled, setDisabled] = useState(true);
  return (
    <TabContainer>
      <TabTitle title="Wybierz klienta" />
      <TabError index={1} />
      <TabDropdown
        dataSource={clients.map(
          (client) =>
            `${client.uzytkownicy.Imie} ${client.uzytkownicy.Nazwisko}`
        )}
        placeholder="Klient"
        dropdownRef={dropdownRef}
        setDisabled={setDisabled}
        setSelectedProperty={setSelectedClient}
      />
      <TabButtonContainer
        type={TabNextButtonType.DEFAULT}
        disabled={disabled}
        dropdownRef={dropdownRef}
        index={1}
        setSelectedProperty={setSelectedClient}
        errorMsg="Proszę wybrać klienta"
      />
    </TabContainer>
  );
};

export default ClientTab;
