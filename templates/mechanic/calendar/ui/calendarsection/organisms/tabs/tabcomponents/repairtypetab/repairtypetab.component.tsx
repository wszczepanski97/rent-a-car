import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { FC, useContext, useRef } from "react";
import {
  TabButtonContainer,
  TabContainer,
  TabDropdown,
  TabError,
  TabTitle,
} from "../../components";
import { TabNextButtonType } from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";

export enum RepairType {
  AutoryzowanySerwis = "Autoryzowany serwis",
  SamodzielnaNaprawa = "Samodzielna naprawa",
  Warsztat = "Warsztat",
}

const RepairTypeTab: FC = () => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { selectedRepairType, setSelectedRepairType, setSelectedCar } =
    useContext(AddEventContext);
  return (
    <TabContainer>
      <TabTitle title="Wybierz typ naprawy" />
      <TabError index={1} />
      <TabDropdown
        dataSource={Object.values(RepairType)}
        dropdownRef={dropdownRef}
        placeholder="Typ naprawy"
        setSelectedProperty={setSelectedRepairType}
        value={selectedRepairType}
      />
      <TabButtonContainer
        type={TabNextButtonType.DEFAULT}
        disabled={!selectedRepairType}
        dropdownRef={dropdownRef}
        errorMsg="Proszę uzupełnić typ naprawy"
        index={1}
        setSelectedProperty={setSelectedRepairType}
        onBackClick={() => {
          setSelectedCar(undefined);
        }}
      />
    </TabContainer>
  );
};

export default RepairTypeTab;
