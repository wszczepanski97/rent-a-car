import classnames from "classnames";
import React, { FC } from "react";
import styles from "../calendar.module.scss";

const cx = classnames.bind(styles);

const CalendarWrapper: FC = ({ children }) => (
  <div className={styles["schedule-control-section"]}>
    <div
      className={cx(styles["control-section"], "col-lg-12")}
      style={{ padding: 0 }}
    >
      <div className={styles["content-wrapper"]}>{children}</div>
    </div>
  </div>
);

export default CalendarWrapper;
