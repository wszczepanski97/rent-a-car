import {
  klienci,
  lokalizacje,
  pracownicy,
  relokacje,
  samochody,
  uslugi,
  uslugistatus,
  uzytkownicy,
  wypozyczenia,
} from "@prisma/client";
import { SidebarContextProvider } from "contexts/sidebar.context";
import { prisma } from "db";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ReactElement } from "react";
import { CalendarSection } from "templates/driver/calendar/ui";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

export type Driver =
  | (uzytkownicy & {
      pracownicy: pracownicy[];
    })
  | null;

export type Service = wypozyczenia & {
  relokacje: (relokacje & {
    uslugi:
      | (uslugi & {
          samochody: samochody;
        })
      | null;
    wypozyczenia:
      | (wypozyczenia & {
          klienci: klienci & {
            uzytkownicy: uzytkownicy;
          };
        })
      | null;
  })[];
  uslugi: uslugi & {
    samochody: samochody;
  };
};

export type CalendarDriverPageProps = {
  driver: Driver;
  locations: lokalizacje[];
  services: Service[];
};

const CalendarDriverPage: NextPageWithLayout<CalendarDriverPageProps> = (
  props
) => {
  return Object.values(props).length ===
    Object.values(props).filter((prop) => prop === null).length ? null : (
    <CalendarSection {...props} />
  );
};

CalendarDriverPage.getLayout = (page: ReactElement) => (
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

const getServices: GetServerSideProps<CalendarDriverPageProps> = async (
  context
) => {
  const session = await getSession(context);

  const driver = await prisma.uzytkownicy.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
      role_uzytkownik: {
        some: {
          role: {
            Nazwa: "KIEROWCA",
          },
        },
      },
    },
    include: { pracownicy: true },
  });

  if (!driver)
    return {
      props: {
        locations: null,
        driver: null,
        services: null,
      },
    };

  const services: Service[] = await prisma.wypozyczenia.findMany({
    where: {
      relokacje: {
        some: {
          OR: [
            {
              IdPracownicy_Odbior: driver?.pracownicy[0].IdPracownicy,
            },
            {
              IdPracownicy_Podstawienie: driver?.pracownicy[0].IdPracownicy,
            },
          ],
        },
      },
    },
    include: {
      relokacje: {
        include: {
          uslugi: {
            include: {
              samochody: true,
            },
          },
          wypozyczenia: {
            include: {
              klienci: {
                include: {
                  uzytkownicy: true,
                },
              },
            },
          },
        },
      },
      uslugi: {
        include: {
          samochody: true,
        },
      },
    },
  });

  const locations = await prisma.lokalizacje.findMany();

  return {
    props: {
      driver: JSON.parse(JSON.stringify(driver)),
      locations: JSON.parse(JSON.stringify(locations)),
      services: JSON.parse(JSON.stringify(services)),
    },
  };
};

export const getServerSideProps = getServices;

export default CalendarDriverPage;
