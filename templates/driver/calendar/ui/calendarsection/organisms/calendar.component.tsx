import { closest, loadCldr } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
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
  TimelineViews,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import * as gregorian from "cldr-data/main/pl/ca-gregorian.json";
import * as numbers from "cldr-data/main/pl/numbers.json";
import * as timeZoneNames from "cldr-data/main/pl/timeZoneNames.json";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import { Service } from "pages/api/driver/calendar";
import { useCallback, useContext, useState } from "react";
import { useCalendar } from "templates/driver/calendar/swr/use-calendar.swr";
import { AddEvent } from "./add-event.component";
import styles from "./calendar.module.scss";
import { Data, getData } from "./data-helper";
import Header from "./header/header.component";
import ContentTemplate from "./quickinfotemplates/contenttemplate.component";
import FooterTemplate from "./quickinfotemplates/footertemplate.component";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import Toolbar from "./toolbar/toolbar.component";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export const Calendar = () => {
  const [disabled, setDisabled] = useState(true);
  const {
    deliveryEstimationTime,
    selectedCarDeliverLocation,
    pickupEstimationTime,
    selectedCarPickupLocation,
    selectedRent,
    selectedRelocationType,
    serviceDescription,
    resetContextData,
  } = useContext(AddEventContext);
  const {
    data: { driver, locations, services },
    mutate,
  } = useCalendar();
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
        service: {
          IdUslugi:
            args.requestType === "eventChanged"
              ? args.changedRecords?.[0].Id
              : undefined,
          DataOd:
            selectedRelocationType === "Podstawienie"
              ? new Date(
                  new Date(selectedRent!.uslugi.DataOd).getTime() -
                    Number(pickupEstimationTime!) * 60 * 60000
                )
              : selectedRent!.uslugi.DataDo,
          DataDo:
            selectedRelocationType === "Podstawienie"
              ? selectedRent!.uslugi.DataOd
              : new Date(
                  new Date(selectedRent!.uslugi.DataDo).getTime() +
                    Number(deliveryEstimationTime!) * 60 * 60000
                ),
          Opis: serviceDescription,
          IdPracownicy_Przypisanie: driver?.pracownicy[0].IdPracownicy,
          IdSamochody: selectedRent?.uslugi.samochody.IdSamochody,
        },
        relocation: {
          IdLokalizacje:
            selectedRelocationType === "Podstawienie"
              ? selectedCarPickupLocation?.IdLokalizacje
              : selectedCarDeliverLocation?.IdLokalizacje,
          CzasDojazdu:
            selectedRelocationType === "Podstawienie"
              ? Number(pickupEstimationTime)
              : Number(deliveryEstimationTime),
          IdWypozyczenia: selectedRent?.IdWypozyczenia,
          Typ_Relokacja:
            selectedRelocationType === "Podstawienie"
              ? "Podstawienie"
              : "Odbior",
        },
      });
      const options = {
        method: args.requestType === "eventCreated" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      };
      const {
        data: { usluga },
      } = await (await fetch("/api/driver/calendar", options)).json();
      await mutate();
      const service = args.requestType === "eventCreated" ? usluga[0] : usluga;
      schedule?.addEvent({
        Id: service.IdUslugi,
        Subject: `Relokacja ${service.samochody.Marka} ${service.samochody.Model}`,
        CategoryColor: "#91b52d",
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
        Type: "Relokacja",
        AssignedWorker: `${service.pracownicy.uzytkownicy.Imie} ${service.pracownicy.uzytkownicy.Nazwisko}`,
        StartTimezone: "Europe/Warsaw",
        EndTimezone: "Europe/Warsaw",
        IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
      });
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
          await fetch("/api/driver/calendar", options);
        })
      );
      await mutate();
    }
    setDisabled(false);
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

  const onPopupClose = (e: PopupCloseEventArgs) => {
    if (e.type === "Editor" && !e.data) {
      resetContextData();
    }
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
      <div className={styles["schedule-overview"]}>
        <Header schedule={schedule} />
        <div className={styles["overview-toolbar"]}>
          <Toolbar schedule={schedule} />
        </div>
      </div>
      <ScheduleComponent
        id="scheduler"
        height="auto"
        width="100%"
        locale="pl"
        cssClass="schedule-overview"
        ref={setSchedule}
        eventSettings={{
          dataSource: dataSource!,
        }}
        timeFormat="HH:mm"
        style={{
          minHeight: "calc(100vh - var(--navbar-height) - 120px) !important",
          maxHeight: "calc(100vh - var(--navbar-height) - 120px) !important",
          overflowY: "auto",
        }}
        editorTemplate={useCallback(
          () => (
            <AddEvent
              locations={locations}
              rents={services.filter(
                (service: Service) =>
                  new Date(service.uslugi.DataOd) > new Date() &&
                  new Date(service.uslugi.DataDo) > new Date()
              )}
            />
          ),
          [locations, services]
        )}
        actionComplete={onActionComplete}
        popupOpen={onPopupOpen}
        popupClose={onPopupClose}
        eventRendered={onEventRendered}
        quickInfoTemplates={{
          //@ts-ignore
          content: (props: Data) => <ContentTemplate {...props} />,
          //@ts-ignore
          footer: (props: Data) =>
            props.Type === "Relokacja" ? (
              //@ts-ignore
              <FooterTemplate
                {...props}
                schedule={schedule}
                services={services}
              />
            ) : null,
        }}
        workHours={{
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
            TimelineViews,
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
