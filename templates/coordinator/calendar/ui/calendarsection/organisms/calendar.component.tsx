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
import { memo, useCallback, useContext, useState } from "react";
import { useCalendar } from "templates/coordinator/calendar/swr/use-calendar.swr";
import { AddEvent, UslugaType } from "./add-event.component";
import styles from "./calendar.module.scss";
import { Data, getData } from "./data-helper";
import Header from "./header/header.component";
import ContentTemplate from "./quickinfotemplates/contenttemplate.component";
import FooterTemplate from "./quickinfotemplates/footertemplate.component";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import { RepairType } from "./tabs/tabcomponents/repairtypetab/repairtypetab.component";
import { WashingType } from "./tabs/tabcomponents/washingtypetab/washingtypetab.component";
import Toolbar from "./toolbar/toolbar.component";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export const Calendar = memo(function Calendar() {
  const [disabled, setDisabled] = useState(true);
  const {
    selectedService,
    selectedClient,
    selectedCar,
    selectedCarPickup,
    selectedCarPickupEmployee,
    selectedCarPickupLocation,
    pickupEstimationTime,
    selectedCarDeliver,
    selectedCarDeliverEmployee,
    selectedCarDeliverLocation,
    deliveryEstimationTime,
    selectedDateTimeRange,
    selectedEmployee,
    serviceDescription,
    priceForService,
    selectedInsurance,
    selectedAdditionalOptions,
    selectedWashingType,
    selectedRepairType,
    resetContextData,
  } = useContext(AddEventContext);
  const {
    data: {
      services,
      clients,
      employees,
      insurances,
      additionalRentOptions,
      cars,
      locations,
    },
    mutate,
  } = useCalendar();
  const [schedule, setSchedule] = useState<ScheduleComponent | null>(null);
  const dataSource = getData(services);
  const onActionComplete = async (args: ActionEventArgs) => {
    if (
      (args.requestType === "eventCreated" ||
        args.requestType === "eventChanged") &&
      //@ts-ignore
      args?.data
    ) {
      if (
        args.addedRecords &&
        args.addedRecords?.length > 0 &&
        args.addedRecords?.[0].Subject
      )
        return;
      setDisabled(true);
      if (selectedService === UslugaType.WYPOŻYCZENIE) {
        const body = JSON.stringify({
          type: UslugaType.WYPOŻYCZENIE,
          service: {
            IdUslugi:
              args.requestType === "eventChanged"
                ? args.changedRecords?.[0].Id
                : undefined,
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
            Czy_Podstawic_Auto: selectedCarPickup,
            Czy_Odebrac_Auto: selectedCarDeliver,
          },
          relocations: {
            Podstawienie:
              selectedCarPickup && Number(pickupEstimationTime) > 0
                ? {
                    IdPracownicy_Podstawienie:
                      selectedCarPickupEmployee?.IdPracownicy,
                    IdLokalizacje_Podstawienie:
                      selectedCarPickupLocation?.IdLokalizacje,
                    CzasDojazdu_Podstawienie: Number(
                      pickupEstimationTime?.replace("h", "")
                    ),
                    IdPracownicy_Odbior: undefined,
                    IdLokalizacje_Odbior: undefined,
                    CzasDojazdu_Odbior: undefined,
                    DataOd:
                      selectedDateTimeRange && pickupEstimationTime
                        ? new Date(
                            new Date(
                              selectedDateTimeRange?.startDateValue?.getTime() -
                                Number(pickupEstimationTime) * 60 * 60 * 1000
                            ).getTime() -
                              new Date(
                                selectedDateTimeRange?.startDateValue?.getTime() -
                                  Number(pickupEstimationTime) * 60 * 60 * 1000
                              ).getTimezoneOffset() *
                                60 *
                                1000
                          )
                        : undefined,
                    DataDo: selectedDateTimeRange
                      ? new Date(
                          selectedDateTimeRange?.startDateValue.getTime() -
                            new Date(
                              selectedDateTimeRange?.startDateValue
                            ).getTimezoneOffset() *
                              60 *
                              1000
                        )
                      : undefined,
                    Typ_Relokacja: "Podstawienie",
                  }
                : undefined,
            Odbior:
              selectedCarDeliver && Number(deliveryEstimationTime)
                ? {
                    IdPracownicy_Podstawienie: undefined,
                    IdLokalizacje_Podstawienie: undefined,
                    CzasDojazdu_Podstawienie: undefined,
                    IdPracownicy_Odbior:
                      selectedCarDeliverEmployee?.IdPracownicy,
                    IdLokalizacje_Odbior:
                      selectedCarDeliverLocation?.IdLokalizacje,
                    CzasDojazdu_Odbior: Number(
                      deliveryEstimationTime?.replace("h", "")
                    ),
                    DataOd: selectedDateTimeRange
                      ? new Date(
                          selectedDateTimeRange?.endDateValue.getTime() -
                            new Date(
                              selectedDateTimeRange?.endDateValue
                            ).getTimezoneOffset() *
                              60 *
                              1000
                        )
                      : undefined,
                    DataDo:
                      selectedDateTimeRange && deliveryEstimationTime
                        ? new Date(
                            new Date(
                              selectedDateTimeRange?.endDateValue?.getTime() +
                                Number(deliveryEstimationTime) * 60 * 60 * 1000
                            ).getTime() -
                              new Date(
                                selectedDateTimeRange?.endDateValue?.getTime() +
                                  Number(deliveryEstimationTime) *
                                    60 *
                                    60 *
                                    1000
                              ).getTimezoneOffset() *
                                60 *
                                1000
                          )
                        : undefined,
                    Typ_Relokacja: "Odbior",
                  }
                : undefined,
          },
          additionalOptions: selectedAdditionalOptions,
        });
        const options = {
          method: args.requestType === "eventCreated" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        };
        const {
          data: { usluga },
        } = await (await fetch("/api/coordinator/calendar", options)).json();
        await mutate();
        schedule?.addEvent({
          Id: usluga[0].IdUslugi,
          Subject: `Wypożyczenie ${usluga[0].samochody.Marka} ${usluga[0].samochody.Model}`,
          Client: usluga[0].wypozyczenia?.[0]?.IdKlienci,
          CategoryColor: "#328ba8",
          StartTime: new Date(
            new Date(usluga[0].DataOd).setHours(
              new Date(usluga[0].DataOd).getHours() - 1
            )
          ),
          EndTime: new Date(
            new Date(usluga[0].DataDo).setHours(
              new Date(usluga[0].DataDo).getHours() - 1
            )
          ),
          Description: usluga[0].Opis,
          Type: "Wypożyczenie",
          AssignedWorker: usluga[0].IdPracownicy_Przypisanie,
          StartTimezone: "Europe/Warsaw",
          EndTimezone: "Europe/Warsaw",
          IsReadonly:
            usluga[0].DataDo && new Date(usluga[0].DataDo) < new Date(),
        });
      } else if (selectedService === UslugaType.MYCIE) {
        if (args.addedRecords?.[0].Subject) return;
        const body = JSON.stringify({
          type: UslugaType.MYCIE,
          service: {
            IdUslugi:
              args.requestType === "eventChanged"
                ? args.changedRecords?.[0].Id
                : undefined,
            DataOd: selectedDateTimeRange?.startDateValue,
            DataDo: selectedDateTimeRange?.endDateValue,
            Opis: serviceDescription,
            IdPracownicy_Przypisanie: selectedEmployee?.IdPracownicy,
            IdSamochody: selectedCar?.IdSamochody,
          },
          washing: {
            MyjniaBezdotykowa: selectedWashingType === WashingType.Bezdotykowa,
            MyjniaAutomatyczna:
              selectedWashingType === WashingType.Automatyczna,
            MyjniaPrywatna: selectedWashingType === WashingType.Prywatna,
          },
        });
        const options = {
          method: args.requestType === "eventCreated" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        };
        const {
          data: { usluga },
        } = await (await fetch("/api/coordinator/calendar", options)).json();
        await mutate();
        schedule?.addEvent({
          Id: usluga[0].IdUslugi,
          Subject: `Mycie ${usluga[0].samochody.Marka} ${usluga[0].samochody.Model}`,
          CategoryColor: "#91b52d",
          StartTime: new Date(
            new Date(usluga[0].DataOd).setHours(
              new Date(usluga[0].DataOd).getHours() - 1
            )
          ),
          EndTime: new Date(
            new Date(usluga[0].DataDo).setHours(
              new Date(usluga[0].DataDo).getHours() - 1
            )
          ),
          Description: usluga[0].Opis,
          Type: "Mycie",
          AssignedWorker: `${usluga[0].pracownicy.Imie} ${usluga[0].pracownicy.Nazwisko}`,
          StartTimezone: "Europe/Warsaw",
          EndTimezone: "Europe/Warsaw",
          IsReadonly:
            usluga[0].DataDo && new Date(usluga[0].DataDo) < new Date(),
        });
      } else if (selectedService === UslugaType.NAPRAWA) {
        const body = JSON.stringify({
          IdUslugi:
            args.requestType === "eventChanged"
              ? args.changedRecords?.[0].Id
              : undefined,
          type: UslugaType.NAPRAWA,
          service: {
            DataOd: selectedDateTimeRange?.startDateValue,
            DataDo: selectedDateTimeRange?.endDateValue,
            Opis: serviceDescription,
            IdPracownicy_Przypisanie: selectedEmployee?.IdPracownicy,
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
        } = await (await fetch("/api/coordinator/calendar", options)).json();
        await mutate();
        schedule?.addEvent({
          Id: usluga[0].IdUslugi,
          Subject: `Naprawa ${usluga[0].samochody.Marka} ${usluga[0].samochody.Model}`,
          CategoryColor: "#b52d9c",
          StartTime: new Date(
            new Date(usluga[0].DataOd).setHours(
              new Date(usluga[0].DataOd).getHours() - 1
            )
          ),
          EndTime: new Date(
            new Date(usluga[0].DataDo).setHours(
              new Date(usluga[0].DataDo).getHours() - 1
            )
          ),
          Description: usluga[0].Opis,
          Type: "Naprawa",
          AssignedWorker: `${usluga[0].pracownicy.Imie} ${usluga[0].pracownicy.Nazwisko}`,
          StartTimezone: "Europe/Warsaw",
          EndTimezone: "Europe/Warsaw",
          IsReadonly:
            usluga[0].DataDo && new Date(usluga[0].DataDo) < new Date(),
        });
      }

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
          await fetch("/api/coordinator/calendar", options);
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

  return (
    <>
      <div className={styles["schedule-overview"]}>
        <Header schedule={schedule} />
        <Toolbar schedule={schedule} />
      </div>
      <ScheduleComponent
        id="scheduler"
        locale="pl"
        cssClass="schedule-overview"
        ref={setSchedule}
        eventSettings={{
          dataSource,
        }}
        timeFormat="HH:mm"
        style={{
          minHeight: "calc(100vh - var(--navbar-height) - 120px) !important",
          maxHeight: "calc(100vh - var(--navbar-height) - 120px) !important",
          overflowY: "auto",
        }}
        popupOpen={onPopupOpen}
        editorTemplate={useCallback(
          () => (
            <AddEvent
              additionalRentOptions={additionalRentOptions}
              cars={cars}
              locations={locations}
              services={services}
              clients={clients}
              employees={employees}
              insurances={insurances}
            />
          ),
          []
        )}
        actionComplete={onActionComplete}
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
              mutate={mutate}
              schedule={schedule}
              clients={clients}
              employees={employees}
              insurances={insurances}
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
});
