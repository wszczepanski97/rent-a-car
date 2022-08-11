import { FC, useContext, useRef, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  TabBackButton,
  TabButtonContainer,
  TabContainer,
  TabDropdown,
  TabError,
  TabNextButton,
  TabTitle,
} from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
import { TabNextButtonType } from "../../components/tabnextbutton/tabnextbutton.component";

export enum WashingType {
  Bezdotykowa = "Myjnia bezdotykowa",
  Automatyczna = "Myjnia automatyczna",
  Prywatna = "Myjnia prywatna",
}

const WashingTypeTab: FC = () => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { selectedWashingType, setSelectedWashingType, setSelectedEmployee } =
    useContext(AddEventContext);
  return (
    <TabContainer>
      <TabTitle title="Wybierz typ mycia" />
      <TabError index={4} />
      <TabDropdown
        dataSource={Object.values(WashingType)}
        dropdownRef={dropdownRef}
        placeholder="Typ mycia"
        setSelectedProperty={setSelectedWashingType}
        value={selectedWashingType}
      />
      <TabButtonContainer
        type={TabNextButtonType.DEFAULT}
        disabled={!selectedWashingType}
        dropdownRef={dropdownRef}
        errorMsg="Proszę uzupełnić typ mycia"
        index={4}
        setSelectedProperty={setSelectedWashingType}
        onBackClick={() => {
          setSelectedEmployee(undefined);
        }}
      />
    </TabContainer>
  );
};

export default WashingTypeTab;
