import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import classnames from "classnames";
import type { FC } from "react";
import styles from "./calendar.module.scss";

const cx = classnames.bind(styles);
type ExcelExportButtonProps = {
  scheduleComponent: ScheduleComponent;
};

export const ExcelExportButton: FC<ExcelExportButtonProps> = ({
  scheduleComponent,
}) => {
  const onClick = () => {
    console.log(
      scheduleComponent
        .getEvents()
        .filter((event) => event.Type === "Relokacja")
    );
    scheduleComponent.exportToExcel({
      exportType: "xlsx",
      customData: scheduleComponent
        .getEvents()
        .filter((event) => event.Type === "Relokacja"),
      fields: [
        "Id",
        "Subject",
        "Client",
        "StartTime",
        "EndTime",
        "Type",
        "AssignedWorker",
        "Location",
      ],
    });
  };
  return (
    <div className={cx(styles["control-panel"], styles["calendar-export"])}>
      <ButtonComponent
        id="exporting"
        cssClass={styles["title-bar-btn"]}
        iconCss="e-icons e-export-excel"
        onClick={onClick}
        content="Eksportuj"
      />
    </div>
  );
};
