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
