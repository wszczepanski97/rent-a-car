import { CalendarAdminPageProps } from "pages/coordinator/calendar";
import { FC } from "react";
import { Calendar } from "./organisms/calendar.component";
import styles from "./organisms/calendar.module.scss";

const CalendarSection: FC<CalendarAdminPageProps> = (props) => (
  <section id="calendarSection" className={styles.calendarSection}>
    <Calendar {...props} />
  </section>
);

export default CalendarSection;
