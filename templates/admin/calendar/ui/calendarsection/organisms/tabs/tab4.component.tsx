import { lokalizacje } from "@prisma/client";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Employee } from "pages/coordinator/calendar";
import { FC } from "react";
import { DateRange } from "./tab3.component";

type Tab4Props = {
  datetimeRange?: DateRange;
  employees: Employee[];
  location?: lokalizacje;
  goStepBack(): void;
  onClick(element?: Employee): void;
};

export const Tab4: FC<Tab4Props> = ({
  datetimeRange,
  employees,
  location,
  goStepBack,
  onClick,
}) => {
  let employeeDropdown: DropDownListComponent | null;
  const restrictEmployeesArray = employees
    .filter((employee) => employee.IdLokalizacje === location?.IdLokalizacje)
    .filter(
      (employee) => employee.stanowiska.role_stanowisko[0].role.IdRole === 4
    )
    .filter(
      (employee) =>
        [
          ...employee.uslugi_pracownicyTouslugi_IdPracownicy_Odbior.map(
            (usluga) =>
              (new Date(usluga.DataOd) >
                new Date(datetimeRange!.startDateValue) &&
                new Date(usluga.DataOd) <
                  new Date(datetimeRange!.endDateValue)) ||
              (new Date(usluga.DataDo) >
                new Date(datetimeRange!.startDateValue) &&
                new Date(usluga.DataDo) < new Date(datetimeRange!.endDateValue))
          ),
          ...employee.uslugi_pracownicyTouslugi_IdPracownicy_Podstawienie.map(
            (usluga) =>
              (new Date(usluga.DataOd) >
                new Date(datetimeRange!.startDateValue) &&
                new Date(usluga.DataOd) <
                  new Date(datetimeRange!.endDateValue)) ||
              (new Date(usluga.DataDo) >
                new Date(datetimeRange!.startDateValue) &&
                new Date(usluga.DataDo) < new Date(datetimeRange!.endDateValue))
          ),
        ].length === 0
    );
  const findEmployee = (personalData: string) =>
    restrictEmployeesArray.find(
      (employee) =>
        `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}` ===
        personalData
    );
  return (
    <div className="responsive-align">
      <div className="row">
        <label className="e-textlabel">Wybierz klienta</label>
        <DropDownListComponent
          ref={(dropdownlist) => {
            employeeDropdown = dropdownlist;
          }}
          dataSource={restrictEmployeesArray.map(
            (employee) =>
              `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}`
          )}
          placeholder="Pracownik"
        />
      </div>
      <div className="btn-container">
        <button id="goToSearch" className="e-btn" onClick={goStepBack}>
          Wróć
        </button>
        <button
          id="employee"
          className="e-btn"
          onClick={() => {
            const employee = findEmployee(employeeDropdown?.value as string);
            onClick(employee);
          }}
        >
          Dalej
        </button>
      </div>
      <span id="err4" />
    </div>
  );
};
