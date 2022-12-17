import {
  mycie,
  pracownicy,
  samochody,
  uslugi,
  uslugistatus,
  uzytkownicy,
} from "@prisma/client";
import { SidebarContextProvider } from "contexts/sidebar.context";
import { prisma } from "db";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ReactElement } from "react";
import { CalendarSection } from "templates/cleaner/calendar/ui";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

export type Cleaner =
  | (uzytkownicy & {
      pracownicy: pracownicy[];
    })
  | null;

export type Service =
  | (uslugi & {
      mycie: mycie[];
      samochody: samochody;
      uslugistatus: uslugistatus;
    })
  | null;

export type Car =
  | (samochody & {
      uslugi: uslugi[];
    })
  | null;

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
    <CalendarSection {...props} />
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

const getServices: GetServerSideProps<CalendarCleanerPageProps> = async (
  context
) => {
  const session = await getSession(context);

  const cleaner = await prisma.uzytkownicy.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
      role_uzytkownik: {
        some: {
          role: {
            Nazwa: "PRACOWNIK MYJNI",
          },
        },
      },
    },
    include: { pracownicy: true },
  });

  if (!cleaner)
    return {
      props: {
        cars: null,
        cleaner: null,
        services: null,
      },
    };

  const cars: Car[] = await prisma.samochody.findMany({
    include: { uslugi: true },
  });

  const services: Service[] = await prisma.uslugi.findMany({
    where: {
      IdPracownicy_Przypisanie: cleaner?.pracownicy[0].IdPracownicy,
    },
    include: {
      mycie: true,
      uslugistatus: true,
      samochody: true,
    },
  });

  return {
    props: {
      cars: JSON.parse(JSON.stringify(cars)),
      cleaner: JSON.parse(JSON.stringify(cleaner)),
      services: JSON.parse(JSON.stringify(services)),
    },
  };
};

export const getServerSideProps = getServices;

export default CalendarCleanerPage;
