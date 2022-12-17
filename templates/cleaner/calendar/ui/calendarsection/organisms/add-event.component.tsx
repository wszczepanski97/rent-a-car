import type { SelectEventArgs } from "@syncfusion/ej2-react-navigations";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import dynamic from "next/dynamic";
import type { CalendarCleanerPageProps } from "pages/cleaner/calendar";
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

const TimeRangeWashingTab = dynamic(
  () =>
    import(
      "./tabs/tabcomponents/timerangewashingtab/timerangewashingtab.component"
    )
);

const WashingTypeTab = dynamic(
  () => import("./tabs/tabcomponents/washingtypetab/washingtypetab.component")
);

export const AddEvent: FC<CalendarCleanerPageProps> = (props) => {
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
          content={() => <CarTab cars={props.cars} />}
        />
        <TabItemDirective
          header={{ text: "2) Typ mycia" }}
          content={() => <WashingTypeTab />}
          disabled
        />
        <TabItemDirective
          header={{ text: "3) Czas" }}
          content={() => <TimeRangeWashingTab />}
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
