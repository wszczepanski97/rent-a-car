import {
  klienci,
  lokalizacje,
  relokacje,
  uzytkownicy,
  wypozyczenia,
} from "@prisma/client";
import type { SelectEventArgs } from "@syncfusion/ej2-react-navigations";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import dynamic from "next/dynamic";
import { FC, useContext } from "react";
import { AddEventContext } from "./tabs/contexts/addevent.context";

const RentTab = dynamic(
  () => import("./tabs/tabcomponents/renttab/renttab.component")
);

const RelocationTypeTab = dynamic(
  () =>
    import("./tabs/tabcomponents/relocationtypetab/relocationtypetab.component")
);

const RelocationDetailsTab = dynamic(
  () =>
    import(
      "./tabs/tabcomponents/relocationdetailstab/relocationdetailstab.component"
    )
);

const DescriptionTab = dynamic(
  () => import("./tabs/tabcomponents/descriptiontab/descriptiontab.component")
);

const SummaryTab = dynamic(
  () => import("./tabs/tabcomponents/summarytab/summarytab.component")
);

type AddEventProps = {
  locations: lokalizacje[];
  rents: (
    | (wypozyczenia & {
        relokacje: (relokacje & {
          wypozyczenia:
            | (wypozyczenia & {
                klienci: klienci & {
                  uzytkownicy: uzytkownicy;
                };
              })
            | null;
        })[];
      })
    | undefined
  )[];
};

export const AddEvent: FC<AddEventProps> = ({ locations, rents }) => {
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
          header={{ text: "1) Wypozyczenie" }}
          content={() => <RentTab rents={rents} />}
        />
        <TabItemDirective
          header={{ text: "2) Typ relokacji" }}
          content={() => <RelocationTypeTab />}
        />
        <TabItemDirective
          header={{ text: "3) Szczegóły relokacji" }}
          content={() => <RelocationDetailsTab locations={locations} />}
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
