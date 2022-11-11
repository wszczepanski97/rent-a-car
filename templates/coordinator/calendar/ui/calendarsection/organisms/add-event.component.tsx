import type { SelectEventArgs } from "@syncfusion/ej2-react-navigations";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import dynamic from "next/dynamic";
import type { CalendarCoordinatorPageProps } from "pages/coordinator/calendar";
import { FC, useContext } from "react";
import { AddEventContext } from "./tabs/contexts/addevent.context";

const AdditionalRentOptionsTab = dynamic(
  () =>
    import(
      "./tabs/tabcomponents/additionalrentoptionstab/additionalrentoptionstab.component"
    )
);
const CarTab = dynamic(
  () => import("./tabs/tabcomponents/cartab/cartab.component")
);
const ClientTab = dynamic(
  () => import("./tabs/tabcomponents/clienttab/clienttab.component")
);
const DescriptionTab = dynamic(
  () => import("./tabs/tabcomponents/descriptiontab/descriptiontab.component")
);

const EmployeeAssigneeTab = dynamic(
  () =>
    import(
      "./tabs/tabcomponents/employeeassigneetab/employeeassigneetab.component"
    )
);

const EmployeeRentTab = dynamic(
  () => import("./tabs/tabcomponents/employeerenttab/employeerenttab.component")
);

const RepairTypeTab = dynamic(
  () => import("./tabs/tabcomponents/repairtypetab/repairtypetab.component")
);

const ServiceTypeTab = dynamic(
  () => import("./tabs/tabcomponents/servicetypetab/servicetypetab.component")
);

const SummaryTab = dynamic(
  () => import("./tabs/tabcomponents/summarytab/summarytab.component")
);

const TimeRangeTab = dynamic(
  () => import("./tabs/tabcomponents/timerangetab/timerangetab.component")
);

const TimeRangeWashingTab = dynamic(
  () =>
    import(
      "./tabs/tabcomponents/timerangewashingtab/timerangewashingtab.component"
    )
);

const WashingTypeTab = dynamic(
  () => import("./tabs/tabcomponents/washingtypetab/washingtypetab.component")
);

export enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  NAPRAWA = "Naprawa",
}

export const AddEvent: FC<CalendarCoordinatorPageProps> = (props) => {
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
          header={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? { text: "6) Podstawienie/Odbiór auta" }
              : { text: "6) Opis" }
          }
          content={
            selectedService === UslugaType.WYPOŻYCZENIE
              ? () => (
                  <EmployeeRentTab
                    employees={props.employees}
                    locations={props.locations}
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
