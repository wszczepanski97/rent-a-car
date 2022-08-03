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
import {
  ClickEventArgs,
  ItemDirective,
  ItemsDirective,
  ToolbarComponent,
} from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "cldr-data/main/pl/ca-gregorian.json";
import * as numbers from "cldr-data/main/pl/numbers.json";
import * as timeZoneNames from "cldr-data/main/pl/timeZoneNames.json";
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
import classnames from "classnames";
import { AddEvent } from "./add-event2.component";
import { FC } from "react";

const cx = classnames.bind(styles);

export const Calendar: FC<CalendarAdminPageProps> = (props) => {
  let scheduleObj: ScheduleComponent | null;
  const isTimelineView = false;
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

  const onToolbarItemClicked = (args: ClickEventArgs) => {
    switch (args.item.text) {
      case "Day":
        scheduleObj!.currentView = isTimelineView ? "TimelineDay" : "Day";
        break;
      case "Week":
        scheduleObj!.currentView = isTimelineView ? "TimelineWeek" : "Week";
        break;
      case "WorkWeek":
        scheduleObj!.currentView = isTimelineView
          ? "TimelineWorkWeek"
          : "WorkWeek";
        break;
      case "Month":
        scheduleObj!.currentView = isTimelineView ? "TimelineMonth" : "Month";
        break;
      case "Agenda":
        scheduleObj!.currentView = "Agenda";
        break;
      case "Nowa Usługa":
        scheduleObj!.openEditor(getEventData(), "Add", true);
        break;
    }
  };

  const exportItems = [{ text: "Excel", iconCss: "e-icons e-export-excel" }];

  const updateLiveTime = () => {
    let timeBtn = document.querySelector("#timeBtn");
    if (timeBtn) {
      timeBtn.innerHTML =
        `<span className="e-btn-icon e-icons e-clock e-icon-left"></span>` +
        new Date().toLocaleString();
    }
  };

  const onPrint = () => {
    scheduleObj!.print();
  };

  const onExportClick = () => {
    scheduleObj!.exportToExcel({
      exportType: "xlsx",
      customData: scheduleObj!.getEvents(),
      fields: [
        "Id",
        "Subject",
        "ServiceType",
        "StartTime",
        "EndTime",
        "PickLocation",
        "ReturnLocation",
        "PickEmployee",
        "ReturnEmployee",
        "OwnerEmployee",
        "Description",
      ],
    });
  };

  const getEventData = () => {
    const date = scheduleObj!.selectedDate;
    return {
      Id: scheduleObj!.getEventMaxID(),
      ServiceType: "Wypożyczenie",
      StartTime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        new Date().getHours(),
        0,
        0
      ),
      EndTime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        new Date().getHours() + 1,
        0,
        0
      ),
      PickLocation: "",
      ReturnLocation: "",
      PickEmployee: "",
      ReturnEmployee: "",
      OwnerEmployee: "",
      Description: "",
      IsAllDay: false,
    };
  };
  return (
    <div className={styles["schedule-control-section"]}>
      <div
        className={cx(styles["control-section"], "col-lg-12")}
        style={{ padding: 0 }}
      >
        <div className={styles["content-wrapper"]}>
          <div className={styles["schedule-overview"]}>
            <div className={styles["overview-header"]}>
              <div className={styles["overview-titlebar"]}>
                <div className={styles["left-panel"]} style={{ width: 200 }}>
                  <div
                    className={styles["schedule-overview-title"]}
                    style={{ border: "1px solid transparent" }}
                  >
                    Kalendarz Admina
                  </div>
                </div>
                <div className={styles["center-panel"]}>
                  <ButtonComponent
                    id="timeBtn"
                    cssClass={styles["title-bar-btn"]}
                    style={{ padding: 0 }}
                    content="Time"
                    disabled
                  />
                </div>
                <div className={styles["right-panel"]} style={{ width: 200 }}>
                  <div
                    className={cx(
                      styles["control-panel"],
                      styles["calendar-export"]
                    )}
                  >
                    <ButtonComponent
                      id="printBtn"
                      cssClass={styles["title-bar-btn"]}
                      iconCss="e-icons e-print"
                      onClick={onPrint}
                      content="Drukuj"
                    />
                  </div>
                  <div
                    className={cx(
                      styles["control-panel"],
                      styles["calendar-export"]
                    )}
                  >
                    <ButtonComponent
                      id="exporting"
                      cssClass={styles["title-bar-btn"]}
                      iconCss="e-icons e-export-excel"
                      onClick={onExportClick}
                      content="Eksportuj"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["overview-toolbar"]}>
              <ToolbarComponent
                id="toolbar_options"
                width="100%"
                created={() =>
                  setInterval(() => {
                    updateLiveTime();
                  }, 1000)
                }
                clicked={onToolbarItemClicked}
              >
                <ItemsDirective>
                  <ItemDirective
                    prefixIcon="e-icons e-plus"
                    tooltipText="Nowa Usługa"
                    text="Nowa Usługa"
                  />
                  <ItemDirective type="Separator" />
                  <ItemDirective
                    template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_725" tabindex="-1" aria-label="Day" style="width: auto;"><span class="e-btn-icon e-icons e-day e-icon-left"></span><span class="e-tbar-btn-text">Dzień</span></button>`}
                    tooltipText="Dzień"
                    text="Day"
                  />
                  <ItemDirective
                    template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_545" tabindex="-1" aria-label="WorkWeek" style="width: auto;"><span class="e-btn-icon e-icons e-week e-icon-left"></span><span class="e-tbar-btn-text">Tydzień</span></button>`}
                    tooltipText="Tydzień"
                    text="Week"
                  />
                  <ItemDirective
                    template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_545" tabindex="-1" aria-label="WorkWeek" style="width: auto;"><span class="e-btn-icon e-icons e-week e-icon-left"></span><span class="e-tbar-btn-text">Tydzień roboczy</span></button>`}
                    tooltipText="Tydzień roboczy"
                    text="WorkWeek"
                  />
                  <ItemDirective
                    template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_363" tabindex="-1" aria-label="Month" style="width: auto;"><span class="e-btn-icon e-icons e-month e-icon-left"></span><span class="e-tbar-btn-text">Miesiąc</span></button>`}
                    tooltipText="Miesiąc"
                    text="Month"
                  />
                  <ItemDirective
                    prefixIcon="e-icons e-agenda-date-range"
                    tooltipText="Agenda"
                    text="Agenda"
                  />
                </ItemsDirective>
              </ToolbarComponent>
            </div>
          </div>
          <ScheduleComponent
            id="scheduler"
            cssClass="schedule-overview"
            width="100%"
            ref={(schedule) => (scheduleObj = schedule)}
            eventSettings={{ dataSource: data }}
            timeFormat="HH:mm"
            startHour="07:00"
            endHour="22:00"
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
