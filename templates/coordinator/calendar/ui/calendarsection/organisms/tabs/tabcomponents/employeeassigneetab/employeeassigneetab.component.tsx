import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Employee } from "pages/api/coordinator/calendar";
import { FC, useContext, useRef } from "react";
import { CalendarContext } from "templates/coordinator/calendar/contexts/calendar.context";
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
    setSelectedDateTimeRange,
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
            if (selectedDateTimeRange) {
              const dataOd = new Date(usluga.DataOd);
              const dataDo = new Date(usluga.DataDo);
              const selectedStart = new Date(
                selectedDateTimeRange?.startDateValue
              );
              const selectedEnd = new Date(selectedDateTimeRange?.endDateValue);
              return (
                (dataOd >= selectedStart && dataOd <= selectedEnd) ||
                (dataDo > selectedStart && dataDo <= selectedEnd)
              );
            }
          });
          return eventsinDateTimeRange.length === 0;
        })
      : employeesArr;
  const onCustomOnNextButtonClick = () => {
    const errorElement = document.getElementById("err4");
    const employee = filterEmployeesWithFreeTime.find(
      (employee) =>
        `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}` ===
        dropdownRef?.current?.value
    );
    if (employee) {
      if (errorElement) {
        errorElement.innerText = "";
      }
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
      if (errorElement) {
        errorElement.innerText = "Proszę wybrać pracownika";
      }
    }
  };
  return (
    <TabContainer height={350}>
      <TabTitle
        title={
          selectedService === UslugaType.MYCIE ||
          selectedService === UslugaType.NAPRAWA
            ? `Wybierz pracownika`
            : `Wybierz przypisanego pracownika`
        }
      />
      <TabError
        index={
          selectedService === UslugaType.MYCIE ||
          selectedService === UslugaType.NAPRAWA
            ? 4
            : 5
        }
      />
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
        index={
          selectedService === UslugaType.MYCIE ||
          selectedService === UslugaType.NAPRAWA
            ? 3
            : 4
        }
        onBackClick={() => {
          setSelectedDateTimeRange(undefined);
        }}
      />
    </TabContainer>
  );
};

export default EmployeeAssigneeTab;
