import { FullScreenContext } from "contexts/full-screen-context";
import { CalendarCoordinatorPageProps } from "pages/coordinator/calendar";
import { FC, useContext } from "react";
import { Calendar } from "./organisms/calendar.component";
import styles from "./organisms/calendar.module.scss";
import AddEventContextProvider from "./organisms/tabs/contexts/addevent.context";

const CalendarSection: FC<CalendarCoordinatorPageProps> = (props) => {
  const { screen } = useContext(FullScreenContext);
  return (
    <section
      id="calendarSection"
      className={styles.calendarSection}
      style={
        screen.active
          ? { margin: "0", height: "100vh", width: "100vw" }
          : { margin: "0 auto" }
      }
    >
      <AddEventContextProvider>
        <Calendar {...props} />
      </AddEventContextProvider>
    </section>
  );
};

export default CalendarSection;
