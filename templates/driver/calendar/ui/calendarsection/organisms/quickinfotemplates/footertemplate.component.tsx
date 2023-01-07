import { relokacje } from "@prisma/client";
import { closest } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import { Service } from "pages/api/coordinator/calendar";
import { FC, useContext } from "react";
import { AddEventContext } from "../tabs/contexts/addevent.context";
import { RelocationType } from "../tabs/tabcomponents/relocationtypetab/relocationtypetab.component";

type FooterTemplateProps = {
  schedule: ScheduleComponent | null;
  elementType: string;
  StartTime: Date;
  EndTime: Date;
  services: Service[];
};

const FooterTemplate: FC<FooterTemplateProps> = ({
  schedule,
  elementType,
  StartTime,
  EndTime,
  services,
}) => {
  const {
    setPickupEstimationTime,
    setSelectedCarPickupLocation,
    setDeliveryEstimationTime,
    setSelectedCarDeliverLocation,
    setSelectedRentId,
    setSelectedRent,
    setServiceDescription,
    setSelectedRelocationType,
    setFormType,
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
        setFormType("NEW");
        schedule?.openEditor(getSlotData(), "Add", true);
      } else {
        const idService = (
          schedule?.activeEventData.event as Record<string, any>
        ).Id;
        const foundService = services
          .map((service: Service) => service.relokacje)
          .flat()
          .find((relokacja: relokacje) => relokacja!.IdUslugi === idService);
        if (foundService) {
          if (foundService.Typ_Relokacja === "Podstawienie") {
            setPickupEstimationTime(String(foundService.CzasDojazdu));
            setSelectedCarPickupLocation(foundService.lokalizacje!);
            setSelectedRelocationType(RelocationType.PODSTAWIENIE);
          } else {
            setDeliveryEstimationTime(String(foundService.CzasDojazdu));
            setSelectedCarDeliverLocation(foundService.lokalizacje!);
            setSelectedRelocationType(RelocationType.ODBIOR);
          }
          setSelectedRentId(String(foundService.IdWypozyczenia));
          //@ts-ignore
          setSelectedRent(foundService.wypozyczenia);
          setServiceDescription(
            //@ts-ignore
            foundService.Opis
          );
          setFormType("EDIT");
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
