import type { SelectEventArgs } from "@syncfusion/ej2-react-navigations";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { CalendarCoordinatorPageProps } from "pages/coordinator/calendar";
import { FC, useContext } from "react";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import {
  AdditionalRentOptionsTab,
  CarTab,
  ClientTab,
  DescriptionTab,
  EmployeeAssigneeTab,
  RepairTypeTab,
  ServiceTypeTab,
  SummaryTab,
  TimeRangeTab,
  TimeRangeWashingTab,
  WashingTypeTab,
} from "./tabs/tabcomponents";
import EmployeeRentTab from "./tabs/tabcomponents/employeerenttab/employeerenttab.component";

export enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  NAPRAWA = "Naprawa",
}

export const AddEvent: FC<CalendarCoordinatorPageProps> = ({
  additionalRentOptions,
  cars,
  clients,
  employees,
  insurances,
  locations,
}) => {
  const { currentTab, selectedService } = useContext(AddEventContext);
  const tabSelecting = (e: SelectEventArgs) => {
    if (e.isSwiped) {
      e.cancel = true;
    }
  };

  return (
    <TabComponent
      id="tab-wizard"
      ref={currentTab}
      style={{ maxHeight: "50vh" }}
      selecting={tabSelecting}
    >
      <TabItemsDirective>
        <TabItemDirective
          header={{ text: "1) Typ usługi" }}
          content={() => <ServiceTypeTab />}
        />

        <TabItemDirective
          header={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? { text: "2) Klient" }
              : { text: "2) Samochód" }
          }
          content={() =>
            selectedService === UslugaType.WYPOŻYCZENIE ? (
              <ClientTab clients={clients} />
            ) : (
              <CarTab cars={cars} />
            )
          }
          disabled={true}
        />
        <TabItemDirective
          header={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? { text: "3) Samochód" }
              : { text: "3) Czas" }
          }
          content={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? () => <CarTab cars={cars} />
              : () => <TimeRangeWashingTab />
          }
          disabled={true}
        />
        <TabItemDirective
          header={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? { text: "4) Czas" }
              : { text: "4) Pracownik" }
          }
          content={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? () => <TimeRangeTab />
              : () => <EmployeeAssigneeTab employees={employees} />
          }
          disabled={true}
        />

        <TabItemDirective
          header={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? { text: "5) Dodatkowe opcje" }
              : selectedService === UslugaType.MYCIE
              ? { text: "5) Typ mycia" }
              : { text: "5) Typ naprawy" }
          }
          content={() =>
            selectedService === UslugaType.WYPOŻYCZENIE ? (
              <AdditionalRentOptionsTab
                additionalRentOptions={additionalRentOptions}
                insurances={insurances}
              />
            ) : selectedService === UslugaType.MYCIE ? (
              <WashingTypeTab />
            ) : (
              <RepairTypeTab />
            )
          }
          disabled={true}
        />
        <TabItemDirective
          header={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? { text: "6) Podstawienie/Odbiór auta" }
              : { text: "6) Opis" }
          }
          content={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? () => (
                  <EmployeeRentTab
                    employees={employees}
                    locations={locations}
                  />
                )
              : () => <DescriptionTab />
          }
          disabled={true}
        />
        <TabItemDirective
          header={{ text: "7) Podsumowanie" }}
          content={() => <SummaryTab />}
          disabled={true}
        />
      </TabItemsDirective>
    </TabComponent>
  );
};
