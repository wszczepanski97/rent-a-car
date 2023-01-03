import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Service } from "pages/api/driver/calendar";
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
  rents: Service[];
};

const RentTab: FC<RentTabProps> = ({ rents }) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const { selectedRentId, selectedRent, setSelectedRentId, setSelectedRent } =
    useContext(AddEventContext);
  return (
    <TabContainer>
      <TabTitle title="Wybierz wypożyczenie" />
      <TabError index={0} />
      <TabDropdown
        dataSource={
          rents?.map(
            (rent) =>
              `#${String(rent?.IdWypozyczenia)} ${
                rent.uslugi.samochody.Marka
              } ${rent.uslugi.samochody.Model} ${new Date(
                new Date(rent.uslugi.DataOd).getTime() +
                  new Date(rent.uslugi.DataOd).getTimezoneOffset() * 60 * 1000
              ).toLocaleString()}-${new Date(
                new Date(rent.uslugi.DataDo).getTime() +
                  new Date(rent.uslugi.DataDo).getTimezoneOffset() * 60 * 1000
              ).toLocaleString()}`
          ) ?? []
        }
        dropdownRef={dropdownRef}
        placeholder="Wypożyczenie..."
        setSelectedProperty={(e) => {
          const rentId = e.match(/#[0-9]+/g)[0].replace("#", "");
          if (!rentId) return;
          setSelectedRentId(e);
          //@ts-ignore
          setSelectedRent(rents.find((rent) => rent?.IdWypozyczenia == rentId));
        }}
        value={
          selectedRent
            ? `#${String(selectedRent?.IdWypozyczenia)} ${
                selectedRent?.uslugi.samochody.Marka
              } ${selectedRent?.uslugi.samochody.Model} ${new Date(
                new Date(selectedRent!.uslugi.DataOd).getTime() +
                  new Date(selectedRent!.uslugi.DataOd).getTimezoneOffset() *
                    60 *
                    1000
              ).toLocaleString()}-${new Date(
                new Date(selectedRent!.uslugi.DataDo).getTime() +
                  new Date(selectedRent!.uslugi.DataDo).getTimezoneOffset() *
                    60 *
                    1000
              ).toLocaleString()}`
            : undefined
        }
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
