import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { CalendarAdminPageProps, Employee } from "pages/coordinator/calendar";
import { FC, LegacyRef, useCallback, useRef, useState } from "react";

enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  USZKODZENIE = "Uszkodzenie",
}

export const AddEvent: FC<CalendarAdminPageProps> = ({
  services,
  cars,
  coordinators,
  carwashers,
  drivers,
  mechanics,
}) => {
  const headerText = [
    { text: "1) Wybierz typ usługi" },
    { text: "2) Wybierz samochód" },
    { text: "3) Wybierz datę od i do" },
    { text: "4) Wybierz miejsce podstawienia i odbioru" },
    {
      text: "5) Wybierz pracownika podstawienia i odbioru oraz osobę przypisaną",
    },
    { text: "6) Dodaj opis" },
  ];
  return (
    <div>
      <div>
        <label className="e-textlabel">Typ usługi</label>
        <DropDownListComponent
          id="ServiceType"
          placeholder="Wybierz typ usługi"
          data-name="ServiceType"
          className="e-field"
          dataSource={Object.values(UslugaType)}
        ></DropDownListComponent>
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div>
          <label className="e-textlabel">Data podstawienia</label>
          <DateTimePickerComponent
            id="StartTime"
            format="dd/MM/yy hh:mm a"
            data-name="StartTime"
            className="e-field"
            ref={startTimeRef}
          ></DateTimePickerComponent>
        </div>
        <div>
          <label className="e-textlabel">Data odbioru</label>
          <DateTimePickerComponent
            id="EndTime"
            format="dd/MM/yy hh:mm a"
            data-name="EndTime"
            className="e-field"
            ref={endTimeRef}
          ></DateTimePickerComponent>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div>
          <label className="e-textlabel">Miejsce podstawienia</label>
          <DropDownListComponent
            id="PickLocation"
            placeholder="Wybierz miejsce podstawienia"
            data-name="PickLocation"
            className="e-field"
            dataSource={["Wypożyczenie", "Mycie", "Uszkodzenie"]}
          ></DropDownListComponent>
        </div>
        <div>
          <label className="e-textlabel">Miejsce odbioru</label>
          <DropDownListComponent
            id="ReturnLocation"
            placeholder="Wybierz miejsce odbioru"
            data-name="ReturnLocation"
            className="e-field"
            dataSource={["Wypożyczenie", "Mycie", "Uszkodzenie"]}
          ></DropDownListComponent>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div>
          <label className="e-textlabel">Wyznaczony pracownik myjni</label>
          <DropDownListComponent
            id="PickEmployee"
            placeholder="Wybierz kierowcę..."
            data-name="PickEmployee"
            className="e-field"
            dataSource={findAvailableEmployees(carwashers).map((employee) => ({
              id: employee.IdPracownicy,
              text: `${employee.Imie} ${employee.Nazwisko}`,
            }))}
          ></DropDownListComponent>
        </div>
        <div>
          <label className="e-textlabel">Kierowca odstawiający</label>
          <DropDownListComponent
            id="ReturnEmployee"
            placeholder="Wybierz kierowcę..."
            data-name="ReturnEmployee"
            className="e-field"
            dataSource={["Wypożyczenie", "Mycie", "Uszkodzenie"]}
          ></DropDownListComponent>
        </div>
      </div>
      <div>
        <label className="e-textlabel">Osoba przypisana</label>
        <DropDownListComponent
          id="OwnerEmployee"
          placeholder="Wybierz osobę przypisaną..."
          data-name="OwnerEmployee"
          className="e-field"
          style={{ width: "100%" }}
          value={0}
          dataSource={Array.from(
            new Set(
              [...carwashers, ...coordinators].map((employee) => ({
                id: employee.IdPracownicy,
                text: `${employee.Imie} ${employee.Nazwisko}`,
              }))
            )
          )}
        ></DropDownListComponent>
      </div>
      <label className="e-textlabel">Description</label>
      <textarea
        id="Description"
        className="e-field e-input"
        name="Description"
        placeholder="Tutaj wpisz opis usługi..."
        rows={3}
        cols={50}
        style={{
          width: "100%",
          height: "60px !important",
          resize: "vertical",
        }}
      ></textarea> */}
    </div>
  );
};
