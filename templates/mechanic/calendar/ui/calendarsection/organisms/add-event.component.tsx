import type { SelectEventArgs } from "@syncfusion/ej2-react-navigations";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import dynamic from "next/dynamic";
import { Car } from "pages/api/mechanic/calendar";
import { FC, useContext } from "react";
import { AddEventContext } from "./tabs/contexts/addevent.context";

const CarTab = dynamic(
  () => import("./tabs/tabcomponents/cartab/cartab.component")
);

const DescriptionTab = dynamic(
  () => import("./tabs/tabcomponents/descriptiontab/descriptiontab.component")
);

const SummaryTab = dynamic(
  () => import("./tabs/tabcomponents/summarytab/summarytab.component")
);

const TimeRangeRepairTab = dynamic(
  () =>
    import(
      "./tabs/tabcomponents/timerangerepairtab/timerangerepairtab.component"
    )
);

const RepairTypeTab = dynamic(
  () => import("./tabs/tabcomponents/repairtypetab/repairtypetab.component")
);

export const AddEvent: FC<{ cars: Car[] }> = ({ cars }) => {
  const { currentTab } = useContext(AddEventContext);
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
          header={{ text: "1) Samochód" }}
          content={() => <CarTab cars={cars} />}
        />
        <TabItemDirective
          header={{ text: "2) Typ naprawy" }}
          content={() => <RepairTypeTab />}
          disabled
        />
        <TabItemDirective
          header={{ text: "3) Czas" }}
          content={() => <TimeRangeRepairTab />}
          disabled
        />
        <TabItemDirective
          header={{ text: "4) Opis" }}
          content={() => <DescriptionTab />}
          disabled
        />
        <TabItemDirective
          header={{ text: "5) Podsumowanie" }}
          content={() => <SummaryTab />}
          disabled
        />
      </TabItemsDirective>
    </TabComponent>
  );
};
