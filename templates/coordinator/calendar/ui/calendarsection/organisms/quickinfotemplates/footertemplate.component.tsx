import { ubezpieczenia } from "@prisma/client";
import { closest } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import { Car, Client, Employee, Service } from "pages/api/coordinator/calendar";
import { FC, useContext } from "react";
import { UslugaType } from "../add-event.component";
import { AddEventContext } from "../tabs/contexts/addevent.context";
import { WashingType } from "../tabs/tabcomponents/washingtypetab/washingtypetab.component";

type FooterTemplateProps = {
  schedule: ScheduleComponent | null;
  elementType: string;
  Type: string;
  StartTime: Date;
  EndTime: Date;
  clients: Client[];
  employees: Employee[];
  insurances: ubezpieczenia[];
  services: Service[];
};

const FooterTemplate: FC<FooterTemplateProps> = ({
  schedule,
  elementType,
  Type,
  StartTime,
  EndTime,
  clients,
  employees,
  insurances,
  services,
}) => {
  const {
    setSelectedService,
    setSelectedClient,
    setSelectedCar,
    setSelectedDateTimeRange,
    setSelectedEmployee,
    setServiceDescription,
    setSelectedInsurance,
    setSelectedWashingType,
    setSelectedAdditionalOptions,
    setDeliveryEstimationTime,
    setSelectedCarDeliver,
    setSelectedCarDeliverEmployee,
    setSelectedCarDeliverLocation,
    setPickupEstimationTime,
    setSelectedCarPickup,
    setSelectedCarPickupEmployee,
    setSelectedCarPickupLocation,
  } = useContext(AddEventContext);

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
            setSelectedAdditionalOptions(
              foundService.wypozyczenia[0].dodatkoweopcje_wypozyczenia.map(
                (el) => el.dodatkoweopcje
              )
            );
            setServiceDescription(
              //@ts-ignore
              foundService.Opis
            );
            const relocationPodstawienie =
              foundService.wypozyczenia[0].relokacje.find(
                (relokacja) => relokacja.Typ_Relokacja === "Podstawienie"
              );
            if (relocationPodstawienie) {
              setPickupEstimationTime(
                String(relocationPodstawienie.CzasDojazdu_Podstawienie)
              );
              setSelectedCarPickup(true);
              setSelectedCarPickupEmployee(
                relocationPodstawienie.pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie ??
                  undefined
              );
              setSelectedCarPickupLocation(
                relocationPodstawienie.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie ??
                  undefined
              );
            }
            const relocationOdbior =
              foundService.wypozyczenia[0].relokacje.find(
                (relokacja) => relokacja.Typ_Relokacja === "Odbior"
              );
            if (relocationOdbior) {
              setDeliveryEstimationTime(
                String(relocationOdbior.CzasDojazdu_Odbior)
              );
              setSelectedCarDeliver(true);
              setSelectedCarDeliverEmployee(
                relocationOdbior.pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior ??
                  undefined
              );
              setSelectedCarDeliverLocation(
                relocationOdbior.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior ??
                  undefined
              );
            }
          } else if (serviceType === UslugaType.MYCIE) {
            const foundEmployee = employees.find(
              (employee) =>
                employee.IdPracownicy === foundService.IdPracownicy_Przypisanie
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
  return (
    <div className="quick-info-footer">
      {elementType == "cell" ? (
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
        Type !== "Relokacja" &&
        StartTime > new Date() &&
        EndTime > new Date() && (
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

export default FooterTemplate;
