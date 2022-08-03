import * as React from "react";
import {
  SelectEventArgs,
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import {
  CalendarAdminPageProps,
  Client,
  Employee,
} from "pages/coordinator/calendar";
import { FC, useRef } from "react";
import { Tab0 } from "./tabs/tab0.component";
import { Tab1 } from "./tabs/tab1.component";
import { Tab2 } from "./tabs/tab2.component";
import { DateRange, Tab3 } from "./tabs/tab3.component";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { Tab4 } from "./tabs/tab4.component";
import { Tab5 } from "./tabs/tab5.component";
import { Tab6 } from "./tabs/tab6.component";

export enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  USZKODZENIE = "Uszkodzenie",
}

export const AddEvent: FC<CalendarAdminPageProps> = (props) => {
  let currentTab: TabComponent | null;
  let filteredCars: Object[] = [];
  const selectedService = useRef<UslugaType>();
  const selectedClient = useRef<Client>();
  const selectedCar = useRef<Object>();
  const selectedEmployee = useRef<Employee>();
  const datetimeRange = useRef<DateRange>();
  const serviceDescription = useRef<string>();
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

  const removeItem = () => {
    let tabItems = currentTab!.element.querySelectorAll(".e-item");
    tabItems.forEach((item, index) => {
      if (index > 0) {
        item.remove();
      }
    });
  };

  const onClickTab0 = (element: DropDownListComponent | null) => {
    if (element != null && element.value != null) {
      document.getElementById("err0")!.innerText = "";
      removeItem();
      currentTab!.enableTab(1, true);
      currentTab!.enableTab(0, false);
      selectedService.current = element.value as UslugaType | undefined;
      filterCars();
    } else {
      document.getElementById("err0")!.innerText =
        "Proszę uzupełnić typ usługi";
    }
  };

  const onClickTab1 = (client: Client | undefined) => {
    if (client) {
      document.getElementById("err1")!.innerText = "";
      removeItem();
      currentTab!.enableTab(2, true);
      currentTab!.enableTab(1, false);
      selectedClient.current = client;
    } else {
      document.getElementById("err1")!.innerText = "Proszę wybrać klienta";
    }
  };

  const onClickTab2 = (element: GridComponent | null) => {
    if (
      element == null ||
      (element != null &&
        (element.getSelectedRecords() === undefined ||
          element.getSelectedRecords().length === 0))
    ) {
      document.getElementById("err2")!.innerText =
        "Żadne z aut nie zostało wybrane. Prosimy o wybranie auta.";
    } else {
      document.getElementById("err2")!.innerText = "";
      removeItem();
      currentTab!.enableTab(3, true);
      currentTab!.enableTab(2, false);
      selectedCar.current = element?.getSelectedRecords()[0];
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
      currentTab!.enableTab(4, true);
      currentTab!.enableTab(3, false);
      datetimeRange.current = range;
    }
  };

  const onClickTab4 = (employee: Employee) => {
    if (employee) {
      document.getElementById("err4")!.innerText = "";
      removeItem();
      currentTab!.enableTab(5, true);
      currentTab!.enableTab(4, false);
      selectedEmployee.current = employee;
    } else {
      document.getElementById("err4")!.innerText = "Proszę wybrać pracownika";
    }
  };

  const onClickTab5 = (description?: string) => {
    removeItem();
    currentTab!.enableTab(6, true);
    currentTab!.enableTab(5, false);
    serviceDescription.current = description;
  };

  const goBackTab1 = () => {
    currentTab!.enableTab(0, true);
    currentTab!.select(0);
    currentTab!.enableTab(1, false);
  };

  const goBackTab2 = () => {
    currentTab!.enableTab(1, true);
    currentTab!.select(1);
    currentTab!.enableTab(2, false);
  };

  const goBackTab3 = () => {
    currentTab!.enableTab(2, true);
    currentTab!.select(2);
    currentTab!.enableTab(3, false);
  };

  const goBackTab4 = () => {
    currentTab!.enableTab(3, true);
    currentTab!.select(3);
    currentTab!.enableTab(4, false);
  };

  const goBackTab5 = () => {
    currentTab!.enableTab(4, true);
    currentTab!.select(4);
    currentTab!.enableTab(5, false);
  };

  const goBackTab6 = () => {
    currentTab!.enableTab(5, true);
    currentTab!.select(5);
    currentTab!.enableTab(6, false);
  };

  const filterCars = () => {
    filteredCars = props.cars;
  };

  return (
    <TabComponent
      id="tab-wizard"
      ref={(tab) => {
        currentTab = tab;
      }}
      style={{ maxHeight: "50vh" }}
      selecting={tabSelecting}
    >
      <TabItemsDirective>
        <TabItemDirective
          header={headerText[0]}
          content={() => <Tab0 onClick={onClickTab0} />}
        />
        <TabItemDirective
          header={headerText[1]}
          content={() => (
            <Tab1
              clients={props.clients}
              goStepBack={goBackTab1}
              onClick={onClickTab1}
            />
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[2]}
          content={() => (
            <Tab2
              filteredCars={filteredCars}
              goStepBack={goBackTab2}
              onClick={onClickTab2}
            />
          )}
          disabled={true}
        />
        <TabItemDirective
          header={headerText[3]}
          content={() => (
            <Tab3
              selectedCar={selectedCar.current}
              selectedClient={selectedClient.current}
              goStepBack={goBackTab3}
              onClick={onClickTab3}
            />
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
