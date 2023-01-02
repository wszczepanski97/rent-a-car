import { loadCldr } from "@syncfusion/ej2-base";
import {
  ActionEventArgs,
  Agenda,
  Day,
  DragAndDrop,
  EventRenderedArgs,
  ExcelExport,
  Inject,
  Month,
  PopupCloseEventArgs,
  PopupOpenEventArgs,
  Print,
  Resize,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import * as gregorian from "cldr-data/main/pl/ca-gregorian.json";
import * as numbers from "cldr-data/main/pl/numbers.json";
import * as timeZoneNames from "cldr-data/main/pl/timeZoneNames.json";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import { FullScreenContext } from "contexts/full-screen.context";
import { memo, useCallback, useContext, useState } from "react";
import { UslugaType } from "templates/coordinator/calendar/ui/calendarsection/organisms/add-event.component";
import { useCalendar } from "templates/mechanic/calendar/swr/use-calendar.swr";
import { AddEvent } from "./add-event.component";
import styles from "./calendar.module.scss";
import { Data, getData } from "./data-helper";
import Header from "./header/header.component";
import ContentTemplate from "./quickinfotemplates/contenttemplate.component";
import FooterTemplate from "./quickinfotemplates/footertemplate.component";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import { RepairType } from "./tabs/tabcomponents/repairtypetab/repairtypetab.component";
import Toolbar from "./toolbar/toolbar.component";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export const Calendar = () => {
  const [disabled, setDisabled] = useState(true);
  const {
    selectedCar,
    selectedDateTimeRange,
    serviceDescription,
    selectedRepairType,
    resetContextData,
  } = useContext(AddEventContext);
  const {
    data: { mechanic, cars, services },
    mutate,
  } = useCalendar();
  const { screen } = useContext(FullScreenContext);
  const [schedule, setSchedule] = useState<ScheduleComponent | null>(null);
  const dataSource = getData(services);
  const onActionComplete = async (args: ActionEventArgs) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged"
    ) {
      if (
        args.addedRecords &&
        args.addedRecords?.length > 0 &&
        args.addedRecords?.[0].Subject
      )
        return;
      setDisabled(true);
      const body = JSON.stringify({
        type: UslugaType.NAPRAWA,
        service: {
          IdUslugi:
            args.requestType === "eventChanged"
              ? args.changedRecords?.[0].Id
              : undefined,
          DataOd: selectedDateTimeRange?.startDateValue,
          DataDo: selectedDateTimeRange?.endDateValue,
          Opis: serviceDescription,
          IdPracownicy_Przypisanie: mechanic?.pracownicy[0].IdPracownicy,
          IdSamochody: selectedCar?.IdSamochody,
        },
        repair: {
          AutoryzowanySerwis:
            selectedRepairType === RepairType.AutoryzowanySerwis,
          SamodzielnaNaprawa:
            selectedRepairType === RepairType.SamodzielnaNaprawa,
          Warsztat: selectedRepairType === RepairType.Warsztat,
        },
      });
      const options = {
        method: args.requestType === "eventCreated" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      };
      const {
        data: { usluga },
      } = await (await fetch("/api/mechanic/calendar", options)).json();
      await mutate();
      const service = args.requestType === "eventCreated" ? usluga[0] : usluga;
      schedule?.addEvent({
        Id: service.IdUslugi,
        Subject: `Naprawa ${service.samochody.Marka} ${service.samochody.Model}`,
        CategoryColor: "#b52d9c",
        StartTime: new Date(
          new Date(service.DataOd).setHours(
            new Date(service.DataOd).getHours() - 1
          )
        ),
        EndTime: new Date(
          new Date(service.DataDo).setHours(
            new Date(service.DataDo).getHours() - 1
          )
        ),
        Description: service.Opis,
        Type: "Naprawa",
        AssignedWorker: `${service.pracownicy.uzytkownicy.Imie} ${service.pracownicy.uzytkownicy.Nazwisko}`,
        StartTimezone: "Europe/Warsaw",
        EndTimezone: "Europe/Warsaw",
        IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
      });
      resetContextData();
    } else if (args.requestType === "eventRemoved") {
      await Promise.all(
        args.data?.map(async (service: Data) => {
          const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              IdUslugi: service.Id,
              type: service.Type,
            }),
          };
          await fetch("/api/mechanic/calendar", options);
        })
      );
      await mutate();
    }
    setDisabled(false);
  };

  const onPopupClose = (e: PopupCloseEventArgs) => {
    if (e.type === "Editor" && !e.data) {
      resetContextData();
    }
  };

  const onPopupOpen = useCallback(
    (args: PopupOpenEventArgs) => {
      if (
        (args.target &&
          !args.target.classList.contains("e-appointment") &&
          args.type === "QuickInfo") ||
        args.type === "Editor"
      ) {
        args.cancel = onEventCheck(args);
      }
      if (disabled) {
        args.cancel = true;
      }
    },
    [disabled]
  );

  const onEventCheck = (args: Record<string, any>) => {
    let eventObj: Record<string, any> =
      args.data instanceof Array ? args.data[0] : args.data;
    return eventObj.StartTime < new Date();
  };

  const onEventRendered = (args: EventRenderedArgs) => {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (schedule?.currentView === "Agenda") {
      (args.element.firstChild as HTMLElement).style.borderLeftColor =
        categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  };

  return (
    <>
      <div
        className={styles["schedule-overview"]}
        style={{ width: screen.active ? "100vw" : "auto" }}
      >
        <Header schedule={schedule} />
        <div className={styles["overview-toolbar"]}>
          <Toolbar schedule={schedule} />
        </div>
      </div>
      <ScheduleComponent
        id="scheduler"
        locale="pl"
        cssClass="schedule-overview"
        ref={setSchedule}
        eventSettings={{
          dataSource: dataSource!,
        }}
        timeFormat="HH:mm"
        style={{
          maxHeight: screen.active ? "87vh" : "77vh",
          width: screen.active ? "100vw" : "auto",
          overflowY: "auto",
        }}
        editorTemplate={useCallback(
          () => (
            <AddEvent cars={cars} />
          ),
          [cars]
        )}
        actionComplete={onActionComplete}
        popupOpen={onPopupOpen}
        popupClose={onPopupClose}
        eventRendered={onEventRendered}
        quickInfoTemplates={{
          //@ts-ignore
          content: (props: Data) => <ContentTemplate {...props} />,
          //@ts-ignore
          footer: (props: Data) => (
            //@ts-ignore
            <FooterTemplate
              {...props}
              schedule={schedule}
              services={services}
            />
          ),
        }}
        workHours={{
          highlight: true,
          start: "00:00",
          end: "23:30",
        }}
        allowKeyboardInteraction
      >
        <ViewsDirective>
          <ViewDirective option="Day" displayName="Dzień" />
          <ViewDirective option="Week" displayName="Tydzień" />
          <ViewDirective option="WorkWeek" displayName="Tydzień roboczy" />
          <ViewDirective option="Month" displayName="Miesiąc" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
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
    </>
  );
};
