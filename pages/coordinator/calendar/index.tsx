import { dodatkoweopcje, lokalizacje, ubezpieczenia } from "@prisma/client";
import { SidebarContextProvider } from "contexts/sidebar.context";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import {
  Car,
  Client,
  Employee,
  get,
  Service,
} from "pages/api/coordinator/calendar";
import { ReactElement } from "react";
import { SWRConfig } from "swr";
import { CalendarContextProvider } from "templates/coordinator/calendar/contexts/calendar.context";
import CalendarSection from "templates/coordinator/calendar/ui/calendarsection/calendarsection.component";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

export type CalendarCoordinatorPageProps = {
  services: Service[];
  cars: Car[];
  clients: Client[];
  employees: Employee[];
  insurances: ubezpieczenia[];
  additionalRentOptions: dodatkoweopcje[];
  locations: lokalizacje[];
};

const CalendarCoordinatorPage: NextPageWithLayout<
  CalendarCoordinatorPageProps
> = (props) => (
  <SWRConfig
    value={{
      refreshInterval: 180000,
    }}
  >
    <Head>
      <title>Kalendarz - Koordynator</title>
    </Head>
    <CalendarContextProvider {...props}>
      <CalendarSection />
    </CalendarContextProvider>
  </SWRConfig>
);

CalendarCoordinatorPage.getLayout = (page: ReactElement) => (
  <SidebarContextProvider>
    <Main>
      <Sidebar />
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <Navbar />
          {page}
        </div>
      </Layout>
    </Main>
  </SidebarContextProvider>
);

const getServices: GetServerSideProps<
  CalendarCoordinatorPageProps
> = async () => ({
  props: { ...(await get()) },
});

export const getServerSideProps = getServices;

export default CalendarCoordinatorPage;
