import { CalendarAdminPageProps } from "pages/coordinator/calendar";
import { FC } from "react";
import { Calendar } from "./organisms/calendar.component";

const CalendarSection: FC<CalendarAdminPageProps> = (props) => (
  <section id="calendarSection">
    <Calendar {...props} />
  </section>
);

export default CalendarSection;
