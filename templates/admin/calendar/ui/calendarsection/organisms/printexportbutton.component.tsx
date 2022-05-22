import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import styles from "./calendar.module.scss";
import classnames from "classnames";
import { FC } from "react";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";

const cx = classnames.bind(styles);
type PrintExportButtonProps = {
  scheduleComponent: ScheduleComponent;
};

export const PrintExportButton: FC<PrintExportButtonProps> = ({
  scheduleComponent,
}) => {
  const onClick = () => scheduleComponent.print();
  return (
    <div className={cx(styles["control-panel"], styles["calendar-export"])}>
      <ButtonComponent
        id="printBtn"
        cssClass={styles["title-bar-btn"]}
        iconCss="e-icons e-print"
        onClick={onClick}
        content="Drukuj"
      />
    </div>
  );
};
