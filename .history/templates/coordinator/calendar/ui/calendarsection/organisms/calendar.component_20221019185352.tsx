import { FC, memo, useCallback, useContext, useState } from "react";
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
  PopupCloseEventArgs,
  EventRenderedArgs,
} from "@syncfusion/ej2-react-schedule";
import { AddEvent, UslugaType } from "./add-event.component";
import Toolbar from "./toolbar/toolbar.component";
import Header from "./header/header.component";
import ViewsDirectives from "./viewsdirectives/viewsdirectives.component";
import styles from "./calendar.module.scss";
import { CalendarCoordinatorPageProps, Car } from "pages/coordinator/calendar";
import { Data, getData } from "./data-helper";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "cldr-data/main/pl/ca-gregorian.json";
import * as numbers from "cldr-data/main/pl/numbers.json";
import * as timeZoneNames from "cldr-data/main/pl/timeZoneNames.json";
import { loadCldr, closest } from "@syncfusion/ej2-base";
import { AddEventContext } from "./tabs/contexts/addevent.context";
import { WashingType } from "./tabs/tabcomponents/washingtypetab/washingtypetab.component";
import { RepairType } from "./tabs/tabcomponents/repairtypetab/repairtypetab.component";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { FullScreenContext } from "contexts/full-screen-context";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export const Calendar: FC<CalendarCoordinatorPageProps> = memo(
  ({
    additionalRentOptions,
    cars,
    clients,
    employees,
    insurances,
    locations,
    services,
  }) => {
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
      setSelectedService,
      setSelectedClient,
      setSelectedCar,
      setSelectedDateTimeRange,
      setSelectedEmployee,
      setServiceDescription,
      setSelectedInsurance,
      setSelectedWashingType,
      resetContextData,
    } = useContext(AddEventContext);
    const { screen } = useContext(FullScreenContext);
    const [schedule, setSchedule] = useState<ScheduleComponent | null>(null);
    const dataSource = getData(services);
    const onActionComplete = async (args: ActionEventArgs) => {
      console.log(args.requestType);
      if (
        args.requestType === "eventCreated" ||
        args.requestType === "eventChanged"
      ) {
        console.log(selectedService);
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
                                    Number(pickupEstimationTime) *
                                      60 *
                                      60 *
                                      1000
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
                                  Number(deliveryEstimationTime) *
                                    60 *
                                    60 *
                                    1000
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
          await fetch("/api/coordinator/calendar", options);
        } else if (selectedService === UslugaType.MYCIE) {
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
              MyjniaBezdotykowa:
                selectedWashingType === WashingType.Bezdotykowa,
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
          await fetch("/api/coordinator/calendar", options);
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
          await fetch("/api/coordinator/calendar", options);
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
      }
    };
    // const onPopupOpen = (e) => {
    //   console.log(e);
    // };
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

    const contentTemplate = (props: Data) => {
      const employeeData = employees.find(
        (employee) => employee.IdPracownicy === props.AssignedWorker
      );
      const clientData = clients.find(
        (client) => client.IdKlienci === props.Client
      );

      return (
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
                    )} - ${props.EndTime.toLocaleTimeString().replace(
                      /:00$/,
                      ""
                    )})`
                  : `${props.StartTime.toLocaleDateString(
                      "pl-PL",
                      dateOptions
                    )} (${props.StartTime.toLocaleTimeString().replace(
                      /:00$/,
                      ""
                    )}) - ${props.EndTime.toLocaleDateString(
                      "pl-PL",
                      dateOptions
                    )} (${props.EndTime.toLocaleTimeString().replace(
                      /:00$/,
                      ""
                    )})`}
              </div>
            </div>
          </div>
          {employeeData && (
            <div className="e-resource">
              <div className="e-resource-icon e-icons"></div>
              <div className="e-resource-details e-text-ellipsis">
                {`${employeeData?.uzytkownicy.Imie} ${employeeData?.uzytkownicy.Nazwisko}`}
              </div>
            </div>
          )}
          {clientData && (
            <div className="e-resource">
              <div
                className="e-user e-icons"
                style={{ fontSize: 18, width: 26 }}
              ></div>
              <div className="e-resource-details e-text-ellipsis">
                {clientData?.uzytkownicy.Imie}{" "}
                {clientData?.uzytkownicy.Nazwisko}
              </div>
            </div>
          )}
        </div>
      );
    };

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
          const serviceType = (
            schedule?.activeEventData.event as Record<string, any>
          ).Type;
          const foundService = services.find(
            (service) => service.IdUslugi === idService
          );
          if (foundService) {
            if (serviceType === UslugaType.WYPOŻYCZENIE) {
              const foundClient = clients.find(
                (client) =>
                  client.IdKlienci === foundService.wypozyczenia[0].IdKlienci
              );
              const foundInsurance = insurances.find(
                (insurance) =>
                  insurance.IdUbezpieczenia ===
                  foundService.wypozyczenia[0].IdUbezpieczenia
              );
              setSelectedService(UslugaType.WYPOŻYCZENIE);
              setSelectedClient(
                //@ts-ignore
                `${foundClient?.uzytkownicy.Imie} ${foundClient?.uzytkownicy.Nazwisko}`
              );
              setSelectedCar(foundService.samochody as Car);
              setSelectedDateTimeRange({
                startDateValue: foundService.DataOd,
                endDateValue: foundService.DataDo,
              });
              setSelectedInsurance(
                //@ts-ignore
                foundInsurance?.Nazwa
              );
              setServiceDescription(
                //@ts-ignore
                foundService.Opis
              );
            } else if (serviceType === UslugaType.MYCIE) {
              const foundEmployee = employees.find(
                (employee) =>
                  employee.IdPracownicy ===
                  foundService.IdPracownicy_Przypisanie
              );
              setSelectedService(UslugaType.MYCIE);
              setSelectedCar(foundService.samochody as Car);
              setSelectedDateTimeRange({
                startDateValue: foundService.DataOd,
                endDateValue: foundService.DataDo,
              });
              setSelectedEmployee(
                //@ts-ignore
                `${foundEmployee?.uzytkownicy.Imie} ${foundEmployee?.uzytkownicy.Nazwisko}`
              );
              setSelectedWashingType(
                foundService.mycie[0].MyjniaAutomatyczna
                  ? WashingType.Automatyczna
                  : foundService.mycie[0].MyjniaBezdotykowa
                  ? WashingType.Bezdotykowa
                  : WashingType.Prywatna
              );
              setServiceDescription(
                //@ts-ignore
                foundService.Opis
              );
            }
            schedule?.openEditor({ Id: idService }, "Save", true);
          }
        }
      }
      schedule?.closeQuickInfoPopup();
    };
    //@ts-ignore
    const footerTemplate = (props) => {
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
            props.Type !== "Relokacja" && (
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
          cssClass="schedule-overview"
          ref={setSchedule}
          eventSettings={{
            dataSource,
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
                additionalRentOptions={additionalRentOptions}
                cars={cars}
                clients={clients}
                employees={employees}
                insurances={insurances}
                services={services}
                locations={locations}
              />
            ),
            []
          )}
          actionComplete={onActionComplete}
          popupClose={onPopupClose}
          // popupOpen={onPopupOpen}
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
      </>
    );
  }
);
