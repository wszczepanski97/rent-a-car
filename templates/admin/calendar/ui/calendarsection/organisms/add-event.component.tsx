import * as React from "react";
import {
  SelectEventArgs,
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { CalendarAdminPageProps } from "pages/coordinator/calendar";
import { FC, useCallback, useContext } from "react";
import ServiceTypeTab from "./tabs/tabcomponents/servicetypetab/servicetypetab.component";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import ClientTab from "./tabs/tabcomponents/clienttab/clienttab.component";
import {
  AdditionalRentOptionsTab,
  CarTab,
  EmployeeTab,
  TimeRangeTab,
} from "./tabs/tabcomponents";
import DescriptionTab from "./tabs/tabcomponents/descriptiontab/descriptiontab.component";
import SummaryTab from "./tabs/tabcomponents/summarytab/summarytab.component";

export enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  USZKODZENIE = "Uszkodzenie",
}

export const AddEvent: FC<CalendarAdminPageProps> = (props) => {
  const { currentTab, selectedService } = useContext(AddEventContext);
  const headerText = [
    { text: "1) Typ" },
    { text: "2) Klient" },
    { text: "3) Samochód" },
    { text: "4) Czas" },
    { text: "5) Dodatkowe opcje" },
    { text: "6) Opis" },
    { text: "7) Podsumowanie" },
  ];

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
          header={headerText[0]}
          content={useCallback(
            () => (
              <ServiceTypeTab />
            ),
            []
          )}
        />
        <TabItemDirective
          header={headerText[1]}
          content={useCallback(
            () => (
              <ClientTab clients={props.clients} />
            ),
            []
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[2]}
          content={useCallback(
            () => (
              <CarTab cars={props.cars} />
            ),
            []
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[3]}
          content={useCallback(
            () => (
              <TimeRangeTab />
            ),
            []
          )}
          disabled={true}
        />
        {/* <TabItemDirective
          header={headerText[4]}
          content={useCallback(
            () => (
              <EmployeeTab employees={props.employees} />
            ),
            []
          )}
          disabled={true}
        /> */}
        <TabItemDirective
          header={headerText[4]}
          content={useCallback(
            () => (
              <AdditionalRentOptionsTab
                insurances={props.insurances}
                additionalOptions={props.additionalRentOptions}
              />
            ),
            []
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[5]}
          content={useCallback(
            () => (
              <DescriptionTab />
            ),
            []
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[6]}
          content={useCallback(
            () => (
              <SummaryTab />
            ),
            []
          )}
        />
      </TabItemsDirective>
    </TabComponent>
  );
};
