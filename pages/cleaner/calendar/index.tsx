import { SidebarContextProvider } from "contexts/sidebar.context";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Car, Cleaner, get, Service } from "pages/api/cleaner/calendar";
import { ReactElement } from "react";
import { SWRConfig } from "swr";
import { CalendarContextProvider } from "templates/cleaner/calendar/contexts/calendar.context";
import { CalendarSection } from "templates/cleaner/calendar/ui";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

export type CalendarCleanerPageProps = {
  cars: Car[];
  cleaner: Cleaner;
  services: Service[];
};

const CalendarCleanerPage: NextPageWithLayout<CalendarCleanerPageProps> = (
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
        <title>Kalendarz - Pracownik myjni</title>
      </Head>
      <CalendarContextProvider {...props}>
        <CalendarSection />
      </CalendarContextProvider>
    </SWRConfig>
  );
};

CalendarCleanerPage.getLayout = (page: ReactElement) => (
  <SidebarContextProvider>
    <Main>
      <Sidebar />
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            height: "100vh",
          }}
        >
          <Navbar />
          {page}
        </div>
      </Layout>
    </Main>
  </SidebarContextProvider>
);

const getServices: GetServerSideProps<CalendarCleanerPageProps> = async (
  context
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return {
    props: { ...(await get(session?.user.id)) },
  };
};

export const getServerSideProps = getServices;

export default CalendarCleanerPage;
