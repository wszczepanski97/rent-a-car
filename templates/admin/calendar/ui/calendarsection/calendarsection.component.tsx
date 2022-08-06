import { CalendarAdminPageProps } from "pages/coordinator/calendar";
import { FC } from "react";
import { Calendar } from "./organisms/calendar.component";
import styles from "./organisms/calendar.module.scss";
import AddEventContextProvider from "./organisms/tabs/contexts/addevent.context";

const CalendarSection: FC<CalendarAdminPageProps> = (props) => (
  <section id="calendarSection" className={styles.calendarSection}>
    <AddEventContextProvider>
      <Calendar {...props} />
    </AddEventContextProvider>
  </section>
);

export default CalendarSection;
