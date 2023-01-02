import {
  pracownicy,
  samochody,
  uslugi,
  uslugistatus,
  uszkodzenia,
  uzytkownicy,
} from "@prisma/client";
import { SidebarContextProvider } from "contexts/sidebar.context";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { Car, get, Mechanic, Service } from "pages/api/mechanic/calendar";
import { ReactElement } from "react";
import { SWRConfig } from "swr";
import { CalendarContextProvider } from "templates/mechanic/calendar/contexts/calendar.context";
import { CalendarSection } from "templates/mechanic/calendar/ui";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

export type CalendarMechanicPageProps = {
  cars: Car[];
  mechanic: Mechanic;
  services: Service[];
};

const CalendarMechanicPage: NextPageWithLayout<CalendarMechanicPageProps> = (
  props
) => {
  return Object.values(props).length ===
    Object.values(props).filter((prop) => prop === null).length ? null : (
    <SWRConfig
      value={{
        refreshInterval: 180000,
      }}
    >
      <Head>
        <title>Kalendarz - Mechanik</title>
      </Head>
      <CalendarContextProvider {...props}>
        <CalendarSection />
      </CalendarContextProvider>
    </SWRConfig>
  );
};

CalendarMechanicPage.getLayout = (page: ReactElement) => (
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

const getServices: GetServerSideProps<CalendarMechanicPageProps> = async (
  context
) => {
  const session = await getSession(context);
  return {
    props: { ...(await get(session?.user.id)) },
  };
};

export const getServerSideProps = getServices;

export default CalendarMechanicPage;
