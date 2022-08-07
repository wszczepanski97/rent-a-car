import { FC, useContext, useRef } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  TabContainer,
  TabDropdown,
  TabError,
  TabNextButton,
  TabTitle,
} from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
import { TabNextButtonType } from "../../components/tabnextbutton/tabnextbutton.component";

export enum RepairType {
  AutoryzowanySerwis = "Autoryzowany serwis",
  SamodzielnaNaprawa = "Samodzielna naprawa",
  Warsztat = "Warsztat",
}

const RepairTypeTab: FC = () => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { selectedRepairType, setSelectedRepairType } =
    useContext(AddEventContext);
  return (
    <TabContainer>
      <TabTitle title="Wybierz typ naprawy" />
      <TabError index={4} />
      <TabDropdown
        dataSource={Object.values(RepairType)}
        dropdownRef={dropdownRef}
        placeholder="Typ naprawy"
        setSelectedProperty={setSelectedRepairType}
        value={selectedRepairType}
      />
      <TabNextButton
        type={TabNextButtonType.DEFAULT}
        disabled={!selectedRepairType}
        dropdownRef={dropdownRef}
        errorMsg="Proszę uzupełnić typ naprawy"
        index={4}
        setSelectedProperty={setSelectedRepairType}
      />
    </TabContainer>
  );
};

export default RepairTypeTab;
