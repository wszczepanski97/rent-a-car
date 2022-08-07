import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Employee } from "pages/coordinator/calendar";
import { FC, useContext, useRef, useState } from "react";
import { UslugaType } from "../../../add-event.component";
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

type EmployeeAssigneeTabProps = { employees: Employee[] };

const EmployeeAssigneeTab: FC<EmployeeAssigneeTabProps> = ({ employees }) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const {
    currentTab,
    selectedService,
    selectedDateTimeRange,
    selectedEmployee,
    setSelectedEmployee,
  } = useContext(AddEventContext);
  const employeesArr = employees.filter((employee) =>
    selectedService === UslugaType.MYCIE
      ? employee.stanowiska.role_stanowisko[0].role.IdRole === 2
      : selectedService === UslugaType.NAPRAWA
      ? employee.stanowiska.role_stanowisko[0].role.IdRole === 3
      : employee.stanowiska.role_stanowisko[0].role.IdRole === 4 ||
        employee.stanowiska.role_stanowisko[0].role.IdRole === 1
  );
  const filterEmployeesWithFreeTime =
    selectedService === UslugaType.MYCIE ||
    selectedService === UslugaType.NAPRAWA
      ? employeesArr.filter((employee) => {
          const eventsinDateTimeRange = employee.uslugi.filter((usluga) => {
            const dataOd = new Date(usluga.DataOd);
            const dataDo = new Date(usluga.DataDo);
            const selectedStart = new Date(
              selectedDateTimeRange!.startDateValue
            );
            const selectedEnd = new Date(selectedDateTimeRange!.endDateValue);
            return (
              (dataOd >= selectedStart && dataOd <= selectedEnd) ||
              (dataDo > selectedStart && dataDo <= selectedEnd)
            );
          });
          return eventsinDateTimeRange.length === 0;
        })
      : employeesArr;
  const onCustomOnNextButtonClick = () => {
    const employee = filterEmployeesWithFreeTime.find(
      (employee) =>
        `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}` ===
        dropdownRef?.current?.value
    );
    if (employee) {
      document.getElementById("err4")!.innerText = "";
      removeItem(currentTab);
      if (selectedService === UslugaType.WYPOŻYCZENIE) {
        currentTab?.current?.enableTab(5, true);
        currentTab?.current?.enableTab(4, false);
      } else {
        currentTab?.current?.enableTab(4, true);
        currentTab?.current?.enableTab(3, false);
      }
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
        dataSource={filterEmployeesWithFreeTime.map(
          (employee) =>
            `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}`
        )}
        dropdownRef={dropdownRef}
        placeholder="Pracownik"
        setSelectedProperty={setSelectedEmployee}
        value={selectedEmployee}
      />
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={onCustomOnNextButtonClick}
        disabled={!selectedEmployee}
        index={3}
      />
    </TabContainer>
  );
};

export default EmployeeAssigneeTab;
