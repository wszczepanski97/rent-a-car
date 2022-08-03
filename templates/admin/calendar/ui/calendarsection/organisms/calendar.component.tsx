import * as React from "react";
import { CalendarAdminPageProps, Service } from "pages/coordinator/calendar";
import styles from "./calendar.module.scss";
import { extend, loadCldr } from "@syncfusion/ej2-base";
import {
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  ExcelExport,
  Print,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "cldr-data/main/pl/ca-gregorian.json";
import * as numbers from "cldr-data/main/pl/numbers.json";
import * as timeZoneNames from "cldr-data/main/pl/timeZoneNames.json";
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
import classnames from "classnames";
import { AddEvent } from "./add-event.component";
import { FC, useState } from "react";
import Toolbar from "./toolbar/toolbar.component";
import Header from "./header/header.component";

const cx = classnames.bind(styles);

export const Calendar: FC<CalendarAdminPageProps> = (props) => {
  const [schedule, setSchedule] = useState<ScheduleComponent | null>(null);
  const getNameOfService = (service: Service) =>
    !!service.wypozyczenia.length
      ? "Wypożyczenie"
      : !!service.uszkodzenia.length
      ? "Uszkodzenie"
      : "Mycie";
  const data = extend(
    [],
    props.services!.map((service) => ({
      Id: service.IdUslugi,
      Subject: `${getNameOfService(service)} ${service.samochody.Marka} ${
        service.samochody.Model
      }`,
      Location: `${service?.lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie.Miejscowosc}, ${service?.lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie.Ulica} ${service?.lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie.NumerUlicy}`,
      StartTime: service.DataOd,
      EndTime: service.DataDo,
      Description: service.Opis,
      Type: getNameOfService(service),
      OwnerId: service.IdPracownicy_Przypisanie,
      PickerId: service.IdPracownicy_Podstawienie,
      ReturnerId: service.IdPracownicy_Odbior,
      IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
    })),
    undefined,
    true
  ) as Record<string, any>[];

  const fields = {
    serviceType: { name: "ServiceType", validation: { required: true } },
    startTime: { name: "StartTime", validation: { required: true } },
    endTime: { name: "EndTime", validation: { required: true } },
    pickLocation: { name: "PickLocation", validation: { required: true } },
    returnLocation: { name: "ReturnLocation", validation: { required: true } },
    pickEmployee: { name: "PickEmployee", validation: { required: true } },
    returnEmployee: { name: "ReturnEmployee", validation: { required: true } },
    ownerEmployee: { name: "OwnerEmployee", validation: { required: true } },
    description: {
      name: "Description",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 500,
      },
    },
  };

  const resourceDataOwner: Record<string, any>[] = Array.from(
    new Set(
      props
        .services!.filter(
          (service) =>
            service.pracownicy_pracownicyTouslugi_IdPracownicy_Przypisanie
        )
        .map(
          (service) =>
            service.pracownicy_pracownicyTouslugi_IdPracownicy_Przypisanie!
              .IdPracownicy
        )
    )
  ).map((Id) => {
    const service = props.services!.find(
      (service) =>
        service.pracownicy_pracownicyTouslugi_IdPracownicy_Przypisanie!
          .IdPracownicy === Id
    );
    return {
      Id,
      Text: `${service?.pracownicy_pracownicyTouslugi_IdPracownicy_Przypisanie?.uzytkownicy.Imie} ${service?.pracownicy_pracownicyTouslugi_IdPracownicy_Przypisanie?.uzytkownicy.Nazwisko}`,
      Color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
  });

  const resourceDataPicker: Record<string, any>[] = Array.from(
    new Set(
      props
        .services!.filter(
          (service) =>
            service.pracownicy_pracownicyTouslugi_IdPracownicy_Podstawienie
        )
        .map(
          (service) =>
            service.pracownicy_pracownicyTouslugi_IdPracownicy_Podstawienie!
              .IdPracownicy
        )
    )
  ).map((Id) => {
    const service = props.services!.find(
      (service) =>
        service.pracownicy_pracownicyTouslugi_IdPracownicy_Podstawienie!
          .IdPracownicy === Id
    );
    return {
      Id,
      Text: `${service?.pracownicy_pracownicyTouslugi_IdPracownicy_Podstawienie?.uzytkownicy.Imie} ${service?.pracownicy_pracownicyTouslugi_IdPracownicy_Podstawienie?.uzytkownicy.Nazwisko}`,
      Color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
  });

  const resourceDataReturner: Record<string, any>[] = Array.from(
    new Set(
      props
        .services!.filter(
          (service) => service.pracownicy_pracownicyTouslugi_IdPracownicy_Odbior
        )
        .map(
          (service) =>
            service.pracownicy_pracownicyTouslugi_IdPracownicy_Odbior!
              .IdPracownicy
        )
    )
  ).map((Id) => {
    const service = props.services!.find(
      (service) =>
        service.pracownicy_pracownicyTouslugi_IdPracownicy_Odbior!
          .IdPracownicy === Id
    );
    return {
      Id,
      Text: `${service?.pracownicy_pracownicyTouslugi_IdPracownicy_Odbior?.uzytkownicy.Imie} ${service?.pracownicy_pracownicyTouslugi_IdPracownicy_Odbior?.uzytkownicy.Nazwisko}`,
      Color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
  });

  return (
    <div className={styles["schedule-control-section"]}>
      <div
        className={cx(styles["control-section"], "col-lg-12")}
        style={{ padding: 0 }}
      >
        <div className={styles["content-wrapper"]}>
          <div className={styles["schedule-overview"]}>
            <Header schedule={schedule} />
            <div className={styles["overview-toolbar"]}>
              <Toolbar schedule={schedule} />
            </div>
          </div>
          <ScheduleComponent
            id="scheduler"
            cssClass="schedule-overview"
            width="100%"
            ref={setSchedule}
            eventSettings={{ dataSource: data }}
            timeFormat="HH:mm"
            startHour="09:00"
            endHour="18:00"
            locale="pl"
            editorTemplate={() => <AddEvent {...props} />}
          >
            <ResourcesDirective>
              <ResourceDirective
                field="OwnerId"
                title="Owners"
                name="Owners"
                allowMultiple={false}
                dataSource={resourceDataOwner}
                textField="Text"
                idField="Id"
                colorField="Color"
              ></ResourceDirective>
              <ResourceDirective
                field="PickerId"
                title="Pickers"
                name="Pickers"
                allowMultiple={false}
                dataSource={resourceDataPicker}
                textField="Text"
                idField="Id"
                colorField="Color"
              ></ResourceDirective>
              <ResourceDirective
                field="ReturnerId"
                title="Returners"
                name="Returners"
                allowMultiple={false}
                dataSource={resourceDataReturner}
                textField="Text"
                idField="Id"
                colorField="Color"
              ></ResourceDirective>
            </ResourcesDirective>
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
        </div>
      </div>
    </div>
  );
};
