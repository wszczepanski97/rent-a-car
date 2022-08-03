import {
  klienci,
  lokalizacje,
  mycie,
  pracownicy,
  role,
  role_stanowisko,
  samochody,
  stanowiska,
  uslugi,
  uszkodzenia,
  uzytkownicy,
  wypozyczenia,
} from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { CalendarSection } from "templates/admin/calendar/ui";
import { prisma } from "../../../db";

export type CalendarAdminPageProps = {
  services: Service[];
  cars: Car[];
  clients: Client[];
  coordinators: Employee[];
  carwashers: Employee[];
  mechanics: Employee[];
  drivers: Employee[];
};

export type Service = uslugi & {
  mycie: mycie[];
  samochody: samochody;
  uszkodzenia: uszkodzenia[];
  wypozyczenia: wypozyczenia[];
  lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Odbior: lokalizacje;
  lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie: lokalizacje;
  pracownicy_pracownicyTouslugi_IdPracownicy_Odbior:
    | (pracownicy & {
        uzytkownicy: uzytkownicy;
      })
    | null;
  pracownicy_pracownicyTouslugi_IdPracownicy_Podstawienie:
    | (pracownicy & {
        uzytkownicy: uzytkownicy;
      })
    | null;
  pracownicy_pracownicyTouslugi_IdPracownicy_Przypisanie:
    | (pracownicy & {
        uzytkownicy: uzytkownicy;
      })
    | null;
};

export type Client = klienci & {
  lokalizacje: lokalizacje;
  uzytkownicy: uzytkownicy;
  wypozyczenia: (wypozyczenia & {
    uslugi: uslugi;
  })[];
};

export type Employee = pracownicy & {
  lokalizacje: lokalizacje;
  stanowiska: stanowiska & {
    role_stanowisko: (role_stanowisko & {
      role: role;
    })[];
  };
  uzytkownicy: uzytkownicy;
  uslugi_pracownicyTouslugi_IdPracownicy_Odbior: uslugi[];
  uslugi_pracownicyTouslugi_IdPracownicy_Podstawienie: uslugi[];
};

export type Car = samochody & {
  uslugi: uslugi[];
};

const CalendarAdminPage: NextPage<CalendarAdminPageProps> = (props) => (
  <CalendarSection {...props} />
);

const getServices: GetServerSideProps<CalendarAdminPageProps> = async () => {
  const services = await prisma.uslugi.findMany({
    include: {
      mycie: true,
      uszkodzenia: true,
      wypozyczenia: true,
      lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Odbior: true,
      lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie: true,
      pracownicy_pracownicyTouslugi_IdPracownicy_Odbior: {
        include: {
          uzytkownicy: true,
        },
      },
      pracownicy_pracownicyTouslugi_IdPracownicy_Podstawienie: {
        include: {
          uzytkownicy: true,
        },
      },
      pracownicy_pracownicyTouslugi_IdPracownicy_Przypisanie: {
        include: {
          uzytkownicy: true,
        },
      },
      samochody: true,
    },
  });
  const clients = await prisma.klienci.findMany({
    where: {
      uzytkownicy: {
        Aktywny: true,
      },
    },
    include: {
      wypozyczenia: {
        include: {
          uslugi: true,
        },
      },
      lokalizacje: true,
      uzytkownicy: true,
    },
  });
  const employees = await prisma.pracownicy.findMany({
    where: {
      uzytkownicy: {
        Aktywny: true,
      },
    },
    include: {
      stanowiska: {
        include: {
          role_stanowisko: {
            include: {
              role: true,
            },
          },
        },
      },
      lokalizacje: true,
      uslugi_pracownicyTouslugi_IdPracownicy_Odbior: true,
      uslugi_pracownicyTouslugi_IdPracownicy_Podstawienie: true,
      uzytkownicy: true,
    },
  });
  const cars = await prisma.samochody.findMany({
    include: {
      uslugi: true,
    },
  });
  return {
    props: {
      services: JSON.parse(JSON.stringify(services)),
      cars: JSON.parse(JSON.stringify(cars)),
      clients: JSON.parse(JSON.stringify(clients)),
      coordinators: JSON.parse(
        JSON.stringify(
          employees.filter((employee) =>
            employee.stanowiska.role_stanowisko.find(
              (rolaStanowisko) => rolaStanowisko.IdRole === 1
            )
          ) || []
        )
      ),
      carwashers: JSON.parse(
        JSON.stringify(
          employees.filter((employee) =>
            employee.stanowiska.role_stanowisko.find(
              (rolaStanowisko) => rolaStanowisko.IdRole === 2
            )
          ) || []
        )
      ),
      mechanics: JSON.parse(
        JSON.stringify(
          employees.filter((employee) =>
            employee.stanowiska.role_stanowisko.find(
              (rolaStanowisko) => rolaStanowisko.IdRole === 3
            )
          ) || []
        )
      ),
      drivers: JSON.parse(
        JSON.stringify(
          employees.filter((employee) =>
            employee.stanowiska.role_stanowisko.find(
              (rolaStanowisko) => rolaStanowisko.IdRole === 4
            )
          ) || []
        )
      ),
    },
  };
};

export const getServerSideProps = getServices;

export default CalendarAdminPage;
