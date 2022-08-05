import * as React from "react";
import {
  SelectEventArgs,
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { CalendarAdminPageProps, Employee } from "pages/coordinator/calendar";
import { FC, useCallback, useContext } from "react";
import { DateRange, Tab3 } from "./tabs/tab3.component";
import { Tab4 } from "./tabs/tab4.component";
import { Tab5 } from "./tabs/tab5.component";
import { Tab6 } from "./tabs/tab6.component";
import ServiceTypeTab from "./tabs/tabcomponents/servicetypetab/servicetypetab.component";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import ClientTab from "./tabs/tabcomponents/clienttab/clienttab.component";
import { CarTab } from "./tabs/tabcomponents";

export enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  USZKODZENIE = "Uszkodzenie",
}

export const AddEvent: FC<CalendarAdminPageProps> = (props) => {
  const {
    currentTab,
    selectedService,
    selectedClient,
    setSelectedClient,
    selectedCar,
  } = useContext(AddEventContext);
  console.log(currentTab);
  const headerText = [
    { text: "1) Typ" },
    { text: "2) Klient" },
    { text: "3) Samochód" },
    { text: "4) Czas" },
    { text: "5) Pracownik" },
    { text: "6) Opis" },
    { text: "7) Podsumowanie" },
  ];

  const tabSelecting = (e: SelectEventArgs) => {
    if (e.isSwiped) {
      e.cancel = true;
    }
  };

  const onClickTab3 = (range: DateRange) => {
    if (range.startDateValue == null) {
      document.getElementById("err3")!.innerText =
        "Data od nie została wybrana, prosimy o uzupełnienie";
    } else if (range.endDateValue == null) {
      document.getElementById("err3")!.innerText =
        "Data do nie została wybrana, prosimy o uzupełnienie";
    } else {
      document.getElementById("err3")!.innerText = "";
      removeItem();
      currentTab!.current.enableTab(4, true);
      currentTab!.current.enableTab(3, false);
      datetimeRange.current = range;
    }
  };

  const onClickTab4 = (employee: Employee) => {
    if (employee) {
      document.getElementById("err4")!.innerText = "";
      removeItem();
      currentTab!.current.enableTab(5, true);
      currentTab!.current.enableTab(4, false);
      selectedEmployee.current = employee;
    } else {
      document.getElementById("err4")!.innerText = "Proszę wybrać pracownika";
    }
  };

  const onClickTab5 = (description?: string) => {
    removeItem();
    currentTab!.current.enableTab(6, true);
    currentTab!.current.enableTab(5, false);
    serviceDescription.current = description;
  };

  const goBackTab4 = () => {
    currentTab!.current.enableTab(3, true);
    currentTab!.current.select(3);
    currentTab!.current.enableTab(4, false);
  };

  const goBackTab5 = () => {
    currentTab!.current.enableTab(4, true);
    currentTab!.current.select(4);
    currentTab!.current.enableTab(5, false);
  };

  const goBackTab6 = () => {
    currentTab!.current.enableTab(5, true);
    currentTab!.current.select(5);
    currentTab!.current.enableTab(6, false);
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
              <Tab3 />
            ),
            []
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[4]}
          content={() => (
            <Tab4
              employees={props.drivers}
              location={selectedClient.current?.lokalizacje}
              datetimeRange={datetimeRange.current}
              goStepBack={goBackTab4}
              onClick={onClickTab4}
            />
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[5]}
          content={() => <Tab5 goStepBack={goBackTab5} onClick={onClickTab5} />}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[6]}
          content={() => (
            <Tab6
              selectedService={selectedService.current}
              selectedClient={selectedClient.current}
              selectedCar={selectedCar.current}
              selectedEmployee={selectedEmployee.current}
              datetimeRange={datetimeRange.current}
              serviceDescription={serviceDescription.current}
              location={selectedClient.current?.lokalizacje}
              // price={
              //   selectedCar.current.cenaZaDzien *
              //   (datetimeRange.current!.endDateValue.getTime() -
              //     datetimeRange.current!.startDateValue.getTime())
              // }
              goStepBack={goBackTab6}
            />
          )}
          disabled={true}
        />
      </TabItemsDirective>
    </TabComponent>
  );
};
