import * as React from "react";
import {
  SelectEventArgs,
  TabComponent,
  TabItemsDirective,
  TabItemDirective,
} from "@syncfusion/ej2-react-navigations";
import { CalendarAdminPageProps } from "pages/coordinator/calendar";
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

export enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  NAPRAWA = "Naprawa",
}

export const AddEvent: FC<CalendarAdminPageProps> = (props) => {
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
              <ClientTab clients={props.clients} />
            ) : (
              <CarTab cars={props.cars} />
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
              ? () => <CarTab cars={props.cars} />
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
              : () => <EmployeeAssigneeTab employees={props.employees} />
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
                insurances={props.insurances}
                additionalOptions={props.additionalRentOptions}
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
          header={{ text: "6) Opis" }}
          content={() => <DescriptionTab />}
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
