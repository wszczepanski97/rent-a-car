import { useContext, useRef, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  TabContainer,
  TabDropdown,
  TabError,
  TabNextButton,
  TabTitle,
} from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
import { UslugaType } from "../../../add-event.component";

const ServiceTypeTab = () => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { setSelectedService } = useContext(AddEventContext);
  const [disabled, setDisabled] = useState(true);
  return (
    <TabContainer>
      <TabTitle title="Wybierz typ usługi" />
      <TabError index={0} />
      <TabDropdown
        dataSource={Object.values(UslugaType)}
        dropdownRef={dropdownRef}
        placeholder="Typ usługi"
        setDisabled={setDisabled}
        setSelectedProperty={setSelectedService}
      />
      <TabNextButton
        disabled={disabled}
        dropdownRef={dropdownRef}
        errorMsg="Proszę uzupełnić typ usługi"
        index={0}
        setSelectedProperty={setSelectedService}
      />
    </TabContainer>
  );
};

export default ServiceTypeTab;
