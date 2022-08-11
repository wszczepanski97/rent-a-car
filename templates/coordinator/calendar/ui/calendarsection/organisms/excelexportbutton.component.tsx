import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import styles from "./calendar.module.scss";
import classnames from "classnames";
import { FC } from "react";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";

const cx = classnames.bind(styles);
type ExcelExportButtonProps = {
  scheduleComponent: ScheduleComponent;
};

export const ExcelExportButton: FC<ExcelExportButtonProps> = ({
  scheduleComponent,
}) => {
  const onClick = () => {
    scheduleComponent.exportToExcel({
      exportType: "xlsx",
      customData: scheduleComponent.getEvents(),
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
