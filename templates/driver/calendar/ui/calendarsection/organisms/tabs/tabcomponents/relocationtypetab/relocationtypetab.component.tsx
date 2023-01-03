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
import DeliveryRelocationInfo from "./deliveryrelocationinfo.component";
import NoPossibleNewRelocationInfo from "./nopossiblenewrelocationinfo.component";
import PickupRelocationInfo from "./pickuprelocationinfo.component";

export enum RelocationType {
  PODSTAWIENIE = "Podstawienie",
  ODBIOR = "Odbior",
}

const RelocationTypeTab: FC = () => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const {
    selectedRelocationType,
    formType,
    setSelectedRelocationType,
    setSelectedRentId,
    setSelectedRent,
    selectedRent,
  } = useContext(AddEventContext);
  const relokacjaPodstawienie = selectedRent?.relokacje.find(
    (relokacja) => relokacja.Typ_Relokacja === "Podstawienie"
  );
  const relokacjaOdbior = selectedRent?.relokacje.find(
    (relokacja) => relokacja.Typ_Relokacja === "Odbior"
  );
  return (
    <TabContainer>
      <TabTitle title="Wybierz typ relokacji" />
      <TabError index={1} />
      <TabDropdown
        dataSource={
          formType === "NEW" && relokacjaPodstawienie && relokacjaOdbior
            ? []
            : formType === "NEW" && relokacjaPodstawienie
            ? ["Odbior"]
            : formType === "NEW" && relokacjaOdbior
            ? ["Podstawienie"]
            : Object.values(RelocationType)
        }
        disabled={
          formType === "EDIT" || (!!relokacjaPodstawienie && !!relokacjaOdbior)
        }
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
          setSelectedRent(undefined);
        }}
      />
      {formType === "NEW" &&
      relokacjaPodstawienie?.uslugi &&
      relokacjaOdbior?.uslugi ? (
        <NoPossibleNewRelocationInfo />
      ) : formType === "NEW" && relokacjaPodstawienie?.uslugi ? (
        <PickupRelocationInfo
          DataOd={relokacjaPodstawienie.uslugi.DataOd}
          DataDo={relokacjaPodstawienie.uslugi.DataDo}
        />
      ) : formType === "NEW" && relokacjaOdbior?.uslugi ? (
        <DeliveryRelocationInfo
          DataOd={relokacjaOdbior.uslugi.DataOd}
          DataDo={relokacjaOdbior.uslugi.DataDo}
        />
      ) : null}
    </TabContainer>
  );
};

export default RelocationTypeTab;
