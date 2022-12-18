import { FullScreenContext } from "contexts/full-screen.context";
import Head from "next/head";
import { CalendarDriverPageProps } from "pages/driver/calendar";
import { FC, useContext } from "react";
import { Calendar } from "./organisms/calendar.component";
import styles from "./organisms/calendar.module.scss";
import AddEventContextProvider from "./organisms/tabs/contexts/addevent.context";

const CalendarSection: FC<CalendarDriverPageProps> = (props) => {
  const { screen } = useContext(FullScreenContext);
  return (
    <>
      <Head>
        <link
          href="https://cdn.syncfusion.com/ej2/bootstrap5.css"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <title>Mój Kalendarz - kierowca </title>
      </Head>
      <section
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
    </>
  );
};

export default CalendarSection;
