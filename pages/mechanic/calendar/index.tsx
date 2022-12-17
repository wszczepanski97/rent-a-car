import {
  pracownicy,
  samochody,
  uslugi,
  uslugistatus,
  uszkodzenia,
  uzytkownicy,
} from "@prisma/client";
import { SidebarContextProvider } from "contexts/sidebar.context";
import { prisma } from "db";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ReactElement } from "react";
import { CalendarSection } from "templates/mechanic/calendar/ui";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

export type Mechanic =
  | (uzytkownicy & {
      pracownicy: pracownicy[];
    })
  | null;

export type Service =
  | (uslugi & {
      uszkodzenia: uszkodzenia[];
      samochody: samochody;
      uslugistatus: uslugistatus;
    })
  | null;

export type Car =
  | (samochody & {
      uslugi: uslugi[];
    })
  | null;

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
    <CalendarSection {...props} />
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
  const mechanic = await prisma.uzytkownicy.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
      role_uzytkownik: {
        some: {
          role: {
            Nazwa: "MECHANIK",
          },
        },
      },
    },
    include: { pracownicy: true },
  });

  if (!mechanic)
    return {
      props: {
        cars: null,
        mechanic: null,
        services: null,
      },
    };

  const cars: Car[] = await prisma.samochody.findMany({
    include: { uslugi: true },
  });

  const services: Service[] = await prisma.uslugi.findMany({
    where: {
      IdPracownicy_Przypisanie: mechanic?.pracownicy[0].IdPracownicy,
    },
    include: {
      uszkodzenia: true,
      uslugistatus: true,
      samochody: true,
    },
  });

  return {
    props: {
      cars: JSON.parse(JSON.stringify(cars)),
      mechanic: JSON.parse(JSON.stringify(mechanic)),
      services: JSON.parse(JSON.stringify(services)),
    },
  };
};

export const getServerSideProps = getServices;

export default CalendarMechanicPage;
