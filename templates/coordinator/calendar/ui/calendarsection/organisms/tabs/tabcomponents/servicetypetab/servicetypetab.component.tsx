import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { FC, useContext, useRef } from "react";
import { UslugaType } from "../../../add-event.component";
import {
  TabContainer,
  TabDropdown,
  TabError,
  TabNextButton,
  TabTitle,
} from "../../components";
import { TabNextButtonType } from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";

const ServiceTypeTab: FC = () => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { selectedService, setSelectedService } = useContext(AddEventContext);
  return (
    <TabContainer>
      <TabTitle title="Wybierz typ usługi" />
      <TabError index={0} />
      <TabDropdown
        dataSource={Object.values(UslugaType)}
        dropdownRef={dropdownRef}
        placeholder="Typ usługi"
        setSelectedProperty={setSelectedService}
        value={selectedService}
      />
      <TabNextButton
        type={TabNextButtonType.DEFAULT}
        disabled={!selectedService}
        dropdownRef={dropdownRef}
        errorMsg="Proszę uzupełnić typ usługi"
        index={0}
        setSelectedProperty={setSelectedService}
      />
    </TabContainer>
  );
};

export default ServiceTypeTab;
