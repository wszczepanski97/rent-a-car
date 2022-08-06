import { FC, useCallback, useContext, useState } from "react";
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
  ActionEventArgs,
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
import { AddEventContext } from "./tabs/contexts/addevent.context";
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export const Calendar: FC<CalendarAdminPageProps> = (props) => {
  const {
    selectedService,
    selectedClient,
    selectedCar,
    selectedDateTimeRange,
    selectedEmployee,
    serviceDescription,
    priceForService,
    deliveryEstimationTime,
    selectedInsurance,
    selectedAdditionalOptions,
    selectedCarPickup,
    selectedCarDeliver,
  } = useContext(AddEventContext);
  const [schedule, setSchedule] = useState<ScheduleComponent | null>(null);
  const dataSource = getData(props.services);
  const onActionComplete = async (args: ActionEventArgs) => {
    console.log(args);
    if (args.requestType === "eventCreated") {
      const body = JSON.stringify({
        service: {
          DataOd: selectedDateTimeRange?.startDateValue,
          DataDo: selectedDateTimeRange?.endDateValue,
          Opis: serviceDescription,
          IdPracownicy_Przypisanie: undefined,
          IdSamochody: selectedCar?.IdSamochody,
        },
        rent: {
          Kwota: priceForService,
          KwotaPoRabacie:
            selectedClient?.ProcentRabatu && priceForService
              ? Math.floor(
                  priceForService -
                    0.01 * selectedClient?.ProcentRabatu * priceForService
                )
              : null,
          IdKlienci: selectedClient?.IdKlienci,
          IdUbezpieczenia: selectedInsurance?.IdUbezpieczenia,
        },
        additionalOptions: selectedAdditionalOptions,
      });
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      };
      await fetch("/api/coordinator/calendar", options);
    }
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
        // timezone="Etc/UTC"
        editorTemplate={useCallback(
          () => (
            <AddEvent {...props} />
          ),
          []
        )}
        actionComplete={onActionComplete}
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
