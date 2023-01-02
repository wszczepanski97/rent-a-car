import Head from "next/head";
import { Calendar } from "./organisms/calendar.component";
import styles from "./organisms/calendar.module.scss";
import AddEventContextProvider from "./organisms/tabs/contexts/addevent.context";

const CalendarSection = () => (
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
    </Head>
    <section className={styles.calendarSection}>
      <AddEventContextProvider>
        <Calendar />
      </AddEventContextProvider>
    </section>
  </>
);

export default CalendarSection;
