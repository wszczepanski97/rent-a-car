import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Employee } from "pages/coordinator/calendar";
import { FC, useContext, useRef, useState } from "react";
import {
  TabButtonContainer,
  TabContainer,
  TabDropdown,
  TabError,
  TabTitle,
} from "../../components";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";

type EmployeeTabProps = { employees: Employee[] };

const EmployeeTab: FC<EmployeeTabProps> = ({ employees }) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const {
    currentTab,
    selectedDateTimeRange,
    selectedClient,
    setSelectedEmployee,
  } = useContext(AddEventContext);
  const [disabled, setDisabled] = useState(true);
  const restrictEmployeesArray = employees
    .filter(
      (employee) =>
        employee.IdLokalizacje === selectedClient?.lokalizacje?.IdLokalizacje
    )
    .filter(
      (employee) => employee.stanowiska.role_stanowisko[0].role.IdRole === 4
    )
    .filter(
      (employee) =>
        [
          ...employee.uslugi_pracownicyTouslugi_IdPracownicy_Odbior.map(
            (usluga) =>
              (new Date(usluga.DataOd) >
                new Date(selectedDateTimeRange!.startDateValue) &&
                new Date(usluga.DataOd) <
                  new Date(selectedDateTimeRange!.endDateValue)) ||
              (new Date(usluga.DataDo) >
                new Date(selectedDateTimeRange!.startDateValue) &&
                new Date(usluga.DataDo) <
                  new Date(selectedDateTimeRange!.endDateValue))
          ),
          ...employee.uslugi_pracownicyTouslugi_IdPracownicy_Podstawienie.map(
            (usluga) =>
              (new Date(usluga.DataOd) >
                new Date(selectedDateTimeRange!.startDateValue) &&
                new Date(usluga.DataOd) <
                  new Date(selectedDateTimeRange!.endDateValue)) ||
              (new Date(usluga.DataDo) >
                new Date(selectedDateTimeRange!.startDateValue) &&
                new Date(usluga.DataDo) <
                  new Date(selectedDateTimeRange!.endDateValue))
          ),
        ].length === 0
    );
  const onCustomOnNextButtonClick = () => {
    const employee = restrictEmployeesArray.find(
      (employee) =>
        `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}` ===
        dropdownRef?.current?.value
    );
    if (employee) {
      document.getElementById("err4")!.innerText = "";
      removeItem(currentTab);
      currentTab?.current?.enableTab(5, true);
      currentTab?.current?.enableTab(4, false);
      setSelectedEmployee(employee);
    } else {
      document.getElementById("err4")!.innerText = "Proszę wybrać pracownika";
    }
  };
  return (
    <TabContainer height={350}>
      <TabTitle title="Wybierz pracownika" />
      <TabError index={4} />
      <TabDropdown
        dataSource={restrictEmployeesArray.map(
          (employee) =>
            `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}`
        )}
        dropdownRef={dropdownRef}
        placeholder="Pracownik"
        setDisabled={setDisabled}
        setSelectedProperty={setSelectedEmployee}
      />
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={onCustomOnNextButtonClick}
        disabled={disabled}
        index={4}
      />
    </TabContainer>
  );
};

export default EmployeeTab;
