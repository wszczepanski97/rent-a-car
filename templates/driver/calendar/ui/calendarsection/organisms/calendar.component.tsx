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
import { FullScreenContext } from "contexts/full-screen.context";
import { CalendarDriverPageProps } from "pages/driver/calendar";
import { FC, memo, useCallback, useContext, useState } from "react";
import { AddEvent } from "./add-event.component";
import styles from "./calendar.module.scss";
import { Data, getData } from "./data-helper";
import Header from "./header/header.component";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import Toolbar from "./toolbar/toolbar.component";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export const Calendar: FC<CalendarDriverPageProps> = memo(function Calendar({
  driver,
  locations,
  services,
}) {
  const { serviceDescription, setServiceDescription, resetContextData } =
    useContext(AddEventContext);
  const { screen } = useContext(FullScreenContext);
  const [schedule, setSchedule] = useState<ScheduleComponent | null>(null);
  const dataSource = getData(services);
  const onActionComplete = async (args: ActionEventArgs) => {
    // if (
    //   args.requestType === "eventCreated" ||
    //   args.requestType === "eventChanged"
    // ) {
    //   const body = JSON.stringify({
    //     type: UslugaType.MYCIE,
    //     service: {
    //       IdUslugi:
    //         args.requestType === "eventChanged"
    //           ? args.changedRecords?.[0].Id
    //           : undefined,
    //       DataOd: selectedDateTimeRange?.startDateValue,
    //       DataDo: selectedDateTimeRange?.endDateValue,
    //       Opis: serviceDescription,
    //       IdPracownicy_Przypisanie: driver?.pracownicy[0].IdPracownicy,
    //       IdSamochody: selectedCar?.IdSamochody,
    //     },
    //     washing: {
    //       MyjniaBezdotykowa: selectedWashingType === WashingType.Bezdotykowa,
    //       MyjniaAutomatyczna: selectedWashingType === WashingType.Automatyczna,
    //       MyjniaPrywatna: selectedWashingType === WashingType.Prywatna,
    //     },
    //   });
    //   const options = {
    //     method: args.requestType === "eventCreated" ? "POST" : "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body,
    //   };
    //   await fetch("/api/driver/calendar", options);
    // } else if (args.requestType === "eventRemoved") {
    //   await Promise.all(
    //     args.data?.map(async (service: Data) => {
    //       const options = {
    //         method: "DELETE",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           IdUslugi: service.Id,
    //           type: service.Type,
    //         }),
    //       };
    //       await fetch("/api/driver/calendar", options);
    //     })
    //   );
    // }
  };

  const onPopupOpen = (args: PopupOpenEventArgs) => {
    console.log(args);
    if (
      args.data?.startTime < new Date() ||
      (args.data?.StartTime < new Date() && !args.data?.Subject)
    ) {
      args.cancel = true;
    }
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

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const contentTemplate = (props: Data) => (
    <div className="e-popup-content">
      <div className="e-date-time">
        <div className="e-date-time-icon e-icons"></div>
        <div className="e-date-time-wrapper e-text-ellipsis">
          <div className="e-date-time-details e-text-ellipsis">
            {props.StartTime.toDateString() === props.EndTime.toDateString()
              ? `${props.StartTime.toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )} (${props.StartTime.toLocaleTimeString().replace(
                  /:00$/,
                  ""
                )} - ${props.EndTime.toLocaleTimeString().replace(/:00$/, "")})`
              : `${props.StartTime.toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )} (${props.StartTime.toLocaleTimeString().replace(
                  /:00$/,
                  ""
                )}) - ${props.EndTime.toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )} (${props.EndTime.toLocaleTimeString().replace(/:00$/, "")})`}
          </div>
        </div>
      </div>
      <div className="e-resource">
        <div className="e-resource-icon e-icons"></div>
        <div className="e-resource-details e-text-ellipsis">
          {`${driver?.Imie} ${driver?.Nazwisko}`}
        </div>
      </div>
    </div>
  );

  const buttonClickActions = (e: Event) => {
    const quickPopup = closest(e.target as Element, ".e-quick-popup-wrapper");
    const getSlotData = () => {
      let cellDetails = schedule?.getCellDetails(
        schedule.getSelectedElements()
      );
      return cellDetails
        ? {
            StartTime: new Date(+cellDetails.startTime),
            EndTime: new Date(+cellDetails.endTime),
          }
        : {};
    };
    if ((e.target as Element).id === "delete") {
      const eventDetails = schedule?.activeEventData.event;
      if (eventDetails) {
        schedule?.deleteEvent(eventDetails, "Delete");
      }
    } else {
      const isCellPopup =
        quickPopup.firstElementChild?.classList.contains("e-cell-popup");
      if (isCellPopup) {
        schedule?.openEditor(getSlotData(), "Add", true);
      } else {
        const idService = (
          schedule?.activeEventData.event as Record<string, any>
        ).Id;
        const foundService = services.find(
          (service) => service!.IdUslugi === idService
        );
        if (foundService) {
          // setSelectedCar(foundService.samochody as Car);
          // setSelectedDateTimeRange({
          //   startDateValue: foundService.DataOd,
          //   endDateValue: foundService.DataDo,
          // });
          // setSelectedWashingType(
          //   foundService.relokacje[0].MyjniaAutomatyczna
          //     ? WashingType.Automatyczna
          //     : foundService.relokacje[0].MyjniaBezdotykowa
          //     ? WashingType.Bezdotykowa
          //     : WashingType.Prywatna
          // );
          setServiceDescription(
            //@ts-ignore
            foundService.Opis
          );
          schedule?.openEditor({ Id: idService }, "Save", true);
        }
      }
    }
    schedule?.closeQuickInfoPopup();
  };
  //@ts-ignore
  const footerTemplate = (props) => {
    if (!(props.StartTime > new Date())) return null;
    return (
      <div className="quick-info-footer">
        {props.elementType == "cell" ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <ButtonComponent
              id="add"
              cssClass="e-flat"
              content="Dodaj"
              isPrimary={true}
              style={{
                width: "70%",
                backgroundColor: "var(--secondary-color-1)",
                border: 0,
                color: "var(--light-background-color)",
              }}
              //@ts-ignore
              onClick={buttonClickActions}
            />
          </div>
        ) : (
          props.Type !== "Wypozyczenie" &&
          !props.IsReadonly && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <ButtonComponent
                id="more-details"
                content="Edytuj"
                isPrimary={true}
                //@ts-ignore
                onClick={buttonClickActions}
              />

              <ButtonComponent
                id="delete"
                cssClass="e-flat"
                content="Usuń"
                style={{
                  backgroundColor: "var(--danger-color)",
                  border: 0,
                  color: "var(--light-background-color)",
                }}
                //@ts-ignore
                onClick={buttonClickActions}
              />
            </div>
          )
        )}
      </div>
    );
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
          maxHeight: screen.active ? "87vh" : "77vh",
          width: screen.active ? "100vw" : "auto",
          overflowY: "auto",
        }}
        editorTemplate={useCallback(
          () => (
            <AddEvent
              locations={locations}
              rents={services.map((service) => service?.wypozyczenia).flat()}
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
          content: contentTemplate,
          //@ts-ignore
          footer: footerTemplate,
        }}
        workHours={{
          highlight: true,
          start: "00:00",
          end: "23:30",
        }}
        allowKeyboardInteraction
      >
        <ViewsDirective>
          <ViewDirective option="Day" displayName="Dzisiaj" />
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
});
