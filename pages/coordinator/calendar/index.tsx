import {
  dodatkoweopcje,
  klienci,
  lokalizacje,
  mycie,
  pracownicy,
  relokacje,
  role,
  role_stanowisko,
  samochody,
  stanowiska,
  ubezpieczenia,
  uslugi,
  uslugistatus,
  uszkodzenia,
  uzytkownicy,
  wypozyczenia,
} from "@prisma/client";
import type { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { CalendarSection } from "templates/coordinator/calendar/ui";
import { NextPageWithLayout } from "types/next";
import { Navbar } from "ui";
import { prisma } from "../../../db";

export type CalendarCoordinatorPageProps = {
  services: Service[];
  cars: Car[];
  clients: Client[];
  employees: Employee[];
  insurances: ubezpieczenia[];
  additionalRentOptions: dodatkoweopcje[];
  locations: lokalizacje[];
};

export type Service = uslugi & {
  wypozyczenia: (wypozyczenia & {
    relokacje: (relokacje & {
      wypozyczenia: wypozyczenia & {
        klienci: klienci & {
          uzytkownicy: uzytkownicy;
        };
        uslugi: uslugi & {
          samochody: samochody;
        };
      };
    })[];
  })[];
  mycie: mycie[];
  uszkodzenia: uszkodzenia[];
  samochody: samochody;
  uslugistatus: uslugistatus;
};

export type Client = klienci & {
  uzytkownicy: uzytkownicy;
  wypozyczenia: (wypozyczenia & {
    uslugi: uslugi;
  })[];
};

export type Employee = pracownicy & {
  stanowiska: stanowiska & {
    role_stanowisko: (role_stanowisko & {
      role: role;
    })[];
  };
  uslugi: uslugi[];
  uzytkownicy: uzytkownicy;
};

export type Car = samochody & {
  uslugi: uslugi[];
};

const CalendarCoordinatorPage: NextPageWithLayout<
  CalendarCoordinatorPageProps
> = (props) => <CalendarSection {...props} />;

CalendarCoordinatorPage.getLayout = (page: ReactElement) => (
  <>
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
  </>
);

const getServices: GetServerSideProps<
  CalendarCoordinatorPageProps
> = async () => {
  const services: Service[] = await prisma.uslugi.findMany({
    include: {
      mycie: true,
      uszkodzenia: true,
      wypozyczenia: {
        include: {
          relokacje: {
            include: {
              wypozyczenia: {
                include: {
                  klienci: {
                    include: {
                      uzytkownicy: true,
                    },
                  },
                  uslugi: {
                    include: {
                      samochody: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      uslugistatus: true,
      samochody: true,
    },
  });
  const clients: Client[] = await prisma.klienci.findMany({
    where: { uzytkownicy: { Aktywny: true } },
    include: { wypozyczenia: { include: { uslugi: true } }, uzytkownicy: true },
  });
  const employees: Employee[] = await prisma.pracownicy.findMany({
    where: { uzytkownicy: { Aktywny: true } },
    include: {
      uzytkownicy: true,
      uslugi: true,
      stanowiska: {
        include: {
          role_stanowisko: {
            include: {
              role: true,
            },
          },
        },
      },
    },
  });
  const cars: Car[] = await prisma.samochody.findMany({
    include: { uslugi: true },
  });
  const insurances = await prisma.ubezpieczenia.findMany();
  const additionalRentOptions = await prisma.dodatkoweopcje.findMany();
  const locations = await prisma.lokalizacje.findMany();
  return {
    props: {
      services: JSON.parse(JSON.stringify(services)),
      cars: JSON.parse(JSON.stringify(cars)),
      clients: JSON.parse(JSON.stringify(clients)),
      employees: JSON.parse(JSON.stringify(employees)),
      insurances: JSON.parse(JSON.stringify(insurances)),
      additionalRentOptions: JSON.parse(JSON.stringify(additionalRentOptions)),
      locations: JSON.parse(JSON.stringify(locations)),
    },
  };
};

export const getServerSideProps = getServices;

export default CalendarCoordinatorPage;
