import { FC, useState } from "react";
import {
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ScheduleComponent,
  Inject,
  Resize,
  DragAndDrop,
  ExcelExport,
  Print,
} from "@syncfusion/ej2-react-schedule";
import { AddEvent } from "./add-event.component";
import Toolbar from "./toolbar/toolbar.component";
import Header from "./header/header.component";
import ViewsDirectives from "./viewsdirectives/viewsdirectives.component";
import CalendarWrapper from "./calendarwrapper/calendarwrapper.component";
import styles from "./calendar.module.scss";
import { CalendarAdminPageProps } from "pages/coordinator/calendar";
import { getData } from "./data-helper";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "cldr-data/main/pl/ca-gregorian.json";
import * as numbers from "cldr-data/main/pl/numbers.json";
import * as timeZoneNames from "cldr-data/main/pl/timeZoneNames.json";
import { loadCldr } from "@syncfusion/ej2-base";
import AddEventContextProvider from "./tabs/contexts/addevent.context";
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export const Calendar: FC<CalendarAdminPageProps> = (props) => {
  const [schedule, setSchedule] = useState<ScheduleComponent | null>(null);
  const dataSource = getData(props.services);
  const onPopupClose = (args) => {
    console.log(args);
  };
  return (
    <CalendarWrapper>
      <div className={styles["schedule-overview"]}>
        <Header schedule={schedule} />
        <div className={styles["overview-toolbar"]}>
          <Toolbar schedule={schedule} />
        </div>
      </div>
      <ScheduleComponent
        id="scheduler"
        cssClass="schedule-overview"
        ref={setSchedule}
        eventSettings={{ dataSource }}
        timeFormat="HH:mm"
        startHour="09:00"
        endHour="18:00"
        locale="pl"
        editorTemplate={() => (
          <AddEventContextProvider>
            <AddEvent {...props} />
          </AddEventContextProvider>
        )}
        popupClose={onPopupClose}
      >
        <ViewsDirectives />
        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            Agenda,
            DragAndDrop,
            Resize,
            Print,
            ExcelExport,
          ]}
        />
      </ScheduleComponent>
    </CalendarWrapper>
  );
};
