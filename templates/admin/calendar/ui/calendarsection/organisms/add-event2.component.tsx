import * as React from "react";
import {
  SelectEventArgs,
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { CalendarAdminPageProps } from "pages/coordinator/calendar";
import { prisma } from "../../../../../../db";
import { FC, useRef } from "react";
import { Tab0 } from "./tabs/tab0.component";
import { Tab1 } from "./tabs/tab1.component";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { Tab2 } from "./tabs/tab2.component";

export enum UslugaType {
  WYPOŻYCZENIE = "Wypożyczenie",
  MYCIE = "Mycie",
  USZKODZENIE = "Uszkodzenie",
}

export const AddEvent: FC<CalendarAdminPageProps> = (props) => {
  let currentTab: TabComponent | null;
  let filteredCars: Object[] = [];
  const serviceType = useRef<UslugaType>();
  const selectedCar = useRef<Object>();
  const headerText = [
    { text: "1) Typ" },
    { text: "2) Samochód" },
    { text: "3) Czas" },
    { text: "Make Payment" },
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
      document.getElementById("err1")!.innerText = "";
      removeItem();
      currentTab!.enableTab(1, true);
      currentTab!.enableTab(0, false);
      serviceType.current = element.value as UslugaType | undefined;
      filterCars();
    } else {
      document.getElementById("err1")!.innerText =
        "Proszę uzupełnić typ usługi";
    }
  };

  const onClickTab1 = (element: GridComponent | null) => {
    if (
      element != null &&
      (element.getSelectedRecords() === undefined ||
        element.getSelectedRecords().length === 0)
    ) {
      document.getElementById("err2")!.innerText =
        "Żadne z aut nie zostało wybrane. Prosimy o wybranie auta.";
    } else {
      document.getElementById("err2")!.innerText = "";
      removeItem();
      currentTab!.enableTab(2, true);
      currentTab!.enableTab(1, false);
      selectedCar.current = element?.getSelectedRecords()[0];
    }
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

  const filterCars = () => {
    filteredCars = props.cars;
  };

  return (
    <div>
      <div className="col-lg-12 control-section e-tab-section">
        <div className="e-sample-resize-container">
          <TabComponent
            id="tab-wizard"
            ref={(tab) => {
              currentTab = tab;
            }}
            heightAdjustMode="None"
            height={"auto"}
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
                    filteredCars={filteredCars}
                    serviceType={serviceType.current}
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
                    selectedCar={selectedCar.current}
                    goStepBack={goBackTab2}
                  />
                )}
                disabled={true}
              />
            </TabItemsDirective>
          </TabComponent>
        </div>
      </div>
    </div>
  );
};
