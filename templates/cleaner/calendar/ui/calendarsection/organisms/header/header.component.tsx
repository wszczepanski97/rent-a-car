import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import classnames from "classnames";
import type { FC } from "react";
import styles from "../calendar.module.scss";

const cx = classnames.bind(styles);

const Header: FC<{ schedule: ScheduleComponent | null }> = ({ schedule }) => {
  const onPrint = () => {
    schedule?.print();
  };

  const onExportClick = () => {
    schedule?.exportToExcel({
      exportType: "xlsx",
      customData: schedule?.getEvents(),
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
