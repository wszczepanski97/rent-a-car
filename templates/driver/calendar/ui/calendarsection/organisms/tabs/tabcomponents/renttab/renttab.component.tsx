import { klienci, relokacje, uzytkownicy, wypozyczenia } from "@prisma/client";
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

type RentTabProps = {
  rents: (
    | (wypozyczenia & {
        relokacje: (relokacje & {
          wypozyczenia:
            | (wypozyczenia & {
                klienci: klienci & {
                  uzytkownicy: uzytkownicy;
                };
              })
            | null;
        })[];
      })
    | undefined
  )[];
};

const RentTab: FC<RentTabProps> = ({ rents }) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { selectedRentId, setSelectedRentId, setSelectedRent } =
    useContext(AddEventContext);
  return (
    <TabContainer>
      <TabTitle title="Wybierz wypożyczenie" />
      <TabError index={0} />
      <TabDropdown
        dataSource={rents?.map((rent) => String(rent?.IdWypozyczenia)) ?? []}
        dropdownRef={dropdownRef}
        placeholder="Wypożyczenie..."
        setSelectedProperty={(e) => {
          setSelectedRentId(e);
          //@ts-ignore
          setSelectedRent(rents.find((rent) => rent?.IdWypozyczenia == e));
        }}
        value={selectedRentId}
      />
      <TabButtonContainer
        type={TabNextButtonType.DEFAULT}
        disabled={!selectedRentId}
        dropdownRef={dropdownRef}
        errorMsg="Proszę wybrać wypożyczenie"
        index={0}
        setSelectedProperty={setSelectedRentId}
        onBackClick={() => undefined}
      />
    </TabContainer>
  );
};

export default RentTab;
