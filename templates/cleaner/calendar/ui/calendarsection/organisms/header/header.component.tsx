import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import classnames from "classnames";
import type { FC } from "react";
import styles from "../calendar.module.scss";

const cx = classnames.bind(styles);

const Header: FC<{ schedule: ScheduleComponent | null }> = ({ schedule }) => {
  const onPrint = () => {
    schedule?.print({
      cssClass: "e-print-schedule",
      currentView: schedule.currentView,
      height: "auto",
      locale: schedule.locale,
      rowAutoHeight: false,
      showHeaderBar: false,
      showTimeIndicator: false,
      showWeekNumber: false,
      timeScale: { enable: true },
      width: "auto",
      workHours: {
        start: "00:00",
        end: "23:30",
      },
    });
  };

  const onExportClick = () => {
    schedule?.exportToExcel({
      fieldsInfo: [
        { name: "Subject", text: "Nazwa" },
        { name: "Car", text: "Samochód" },
        { name: "StartTime", text: "Czas startu" },
        { name: "EndTime", text: "Czas zakończenia" },
        { name: "Description", text: "Opis" },
        { name: "MyjniaAutomatyczna", text: "Myjnia automatyczna" },
        { name: "MyjniaBezdotykowa", text: "Myjnia bezdotykowa" },
        { name: "MyjniaPrywatna", text: "Myjnia prywatna" },
      ],
      customData: schedule?.getEvents().map((event) => ({
        ...event,
        StartTime: event.StartTime.toLocaleString(),
        EndTime: event.EndTime.toLocaleString(),
      })),
      exportType: "xlsx",
      fields: [
        "Id",
        "Subject",
        "Car",
        "StartTime",
        "EndTime",
        "Description",
        "MyjniaAutomatyczna",
        "MyjniaBezdotykowa",
        "MyjniaPrywatna",
      ],
      fileName: `Wykaz Pracownik Myjni ${new Date().toLocaleDateString()}`,
    });
  };
  return (
    <div className={styles["overview-header"]}>
      <div className={styles["overview-titlebar"]}>
        <div className={styles["left-panel"]} style={{ width: 200 }}>
          <div
            className={styles["schedule-overview-title"]}
            style={{ border: "1px solid transparent" }}
          >
            Kalendarz Pracownika Myjni
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
        <div className={styles["right-panel"]}>
          <div
            className={cx(styles["control-panel"], styles["calendar-export"])}
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
            className={cx(styles["control-panel"], styles["calendar-export"])}
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
  );
};

export default Header;
