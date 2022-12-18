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

export enum RelocationType {
  PODSTAWIENIE = "Podstawienie",
  ODBIOR = "Odbior",
}

const RelocationTypeTab: FC = () => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const {
    selectedRelocationType,
    setSelectedRelocationType,
    setSelectedRentId,
  } = useContext(AddEventContext);
  return (
    <TabContainer>
      <TabTitle title="Wybierz typ relokacji" />
      <TabError index={1} />
      <TabDropdown
        dataSource={Object.values(RelocationType)}
        dropdownRef={dropdownRef}
        placeholder="Typ relokacji"
        setSelectedProperty={setSelectedRelocationType}
        value={selectedRelocationType}
      />
      <TabButtonContainer
        type={TabNextButtonType.DEFAULT}
        disabled={!selectedRelocationType}
        dropdownRef={dropdownRef}
        errorMsg="Proszę uzupełnić typ relokacji"
        index={1}
        setSelectedProperty={setSelectedRelocationType}
        onBackClick={() => {
          setSelectedRentId(undefined);
        }}
      />
    </TabContainer>
  );
};

export default RelocationTypeTab;
