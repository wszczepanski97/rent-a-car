import {
  klienci,
  lokalizacje,
  oddzialy,
  pracownicy,
  stanowiska,
} from "@prisma/client";
import type { GetServerSideProps } from "next";
import { createContext, ReactElement } from "react";
import {
  DeptEmpsSection,
  MyDepartmentCarousel,
} from "templates/admin/mydepartment/ui";
import DeptCarsSection from "templates/admin/mydepartment/ui/deptcarsssection/deptcarssection.component";
import DeptClientsSection from "templates/admin/mydepartment/ui/deptclientssection/deptclientssection.component";
import { NextPageWithLayout } from "types/next";
import { Navbar } from "ui";
import { prisma } from "../../../db";
import styles from "../../../templates/admin/mydepartment/ui/mydepartment.module.scss";

export type EmployeesContextInterface = {
  employees: pracownicy[] | null;
  allLocations: lokalizacje[] | null;
  allJobPositions: stanowiska[] | null;
  allDepartments: oddzialy[] | null;
};

export const EmployeesContext = createContext({} as EmployeesContextInterface);

type Car = {
  RodzajPaliwa: string;
  Nadwozie: string;
  PojemnoscBagaznika: string;
  IloscDrzwi: string;
  IloscMiejsc: string;
  IdSamochody: number;
  NumerRejestracyjny: string;
  NumerVIN: string;
  Kategoria: string;
  CzyUszkodzony: string;
  CzyUmyty: string;
  Przebieg: string;
  CenaZaDzien: number;
  Marka: string;
  Model: string;
};

export type CarsContextInterface = {
  cars: Car[];
};

export const CarsContext = createContext({} as CarsContextInterface);

type Client = klienci & {
  lokalizacje: {
    IdLokalizacje: number;
    Nazwa: string;
  };
  IdKlienci: number;
  ProcentRabatu: number | null;
  uzytkownicy: {
    IdUzytkownicy: number;
    Email: string;
    Imie: string;
    Nazwisko: string;
    NumerDowodu: string;
    NumerPrawaJazdy: string;
    NumerTelefonu: string;
    Pesel: string;
  };
};

export type ClientsContextInterface = {
  clients: Client[];
  allLocations: lokalizacje[] | null;
};

export const ClientsContext = createContext({} as ClientsContextInterface);

type MyDepartmentPageProps = {
  employeesContext: EmployeesContextInterface;
  carsContext: CarsContextInterface;
  clientsContext: ClientsContextInterface;
};

const MyDepartmentAdminPage: NextPageWithLayout<MyDepartmentPageProps> = ({
  employeesContext,
  carsContext,
  clientsContext,
}) => (
  <MyDepartmentCarousel>
    <EmployeesContext.Provider value={{ ...employeesContext }}>
      <DeptEmpsSection />
    </EmployeesContext.Provider>
    <CarsContext.Provider value={{ ...carsContext }}>
      <DeptCarsSection />
    </CarsContext.Provider>
    <ClientsContext.Provider value={{ ...clientsContext }}>
      <DeptClientsSection />
    </ClientsContext.Provider>
  </MyDepartmentCarousel>
);

MyDepartmentAdminPage.getLayout = (page: ReactElement) => (
  <>
    <Navbar />
    <div className={styles.myDepartmentLayout}>{page}</div>
  </>
);

const getDeptEmps: GetServerSideProps<MyDepartmentPageProps> = async () => {
  const employees = (
    await prisma.pracownicy.findMany({
      select: {
        lokalizacje: {
          select: {
            IdLokalizacje: true,
            Miejscowosc: true,
            Ulica: true,
            NumerUlicy: true,
          },
        },
        oddzialy_hist: {
          select: {
            OdKiedy: true,
            DoKiedy: true,
          },
        },
        stanowiska: true,
        uzytkownicy: {
          select: {
            IdUzytkownicy: true,
            Email: true,
            Imie: true,
            Nazwisko: true,
            NumerDowodu: true,
            NumerPrawaJazdy: true,
            NumerTelefonu: true,
            Pesel: true,
          },
        },
      },
    })
  )
    .map((employee) => ({
      ...employee,
      lokalizacje: {
        IdLokalizacje: employee.lokalizacje.IdLokalizacje,
        Nazwa: `${employee.lokalizacje.Miejscowosc}, ${employee.lokalizacje.Ulica} ${employee.lokalizacje.NumerUlicy}`,
      },
      oddzialy_hist: employee.oddzialy_hist.find(
        (contract) =>
          contract.OdKiedy.getTime() < new Date().getTime() &&
          (contract.DoKiedy === null ||
            contract.DoKiedy.getTime() > new Date().getTime())
      ),
    }))
    .map((employee) => ({
      ...employee,
      oddzialy_hist: {
        OdKiedy: employee.oddzialy_hist?.OdKiedy.toLocaleDateString(),
        DoKiedy: employee.oddzialy_hist?.DoKiedy?.toLocaleDateString(),
      },
    }));
  const cars: Car[] = (
    await prisma.samochody.findMany({
      include: {
        samochodyszczegoly: true,
      },
    })
  )
    .map(
      ({
        OstatniaAktualizacja,
        Zdjecia,
        samochodyszczegoly: { IdSamochodySzczegoly, ...samochodyszczegolyrest },
        CzyUmyty,
        CzyUszkodzony,
        ...samochodRest
      }) => ({
        CzyUmyty: CzyUmyty ? "TAK" : "NIE",
        CzyUszkodzony: CzyUszkodzony ? "TAK" : "NIE",
        ...samochodRest,
        ...samochodyszczegolyrest,
      })
    )
    .filter(({ IdSamochodySzczegoly, ...rest }) => ({ ...rest }));
  const clients = (
    await prisma.klienci.findMany({
      include: {
        lokalizacje: {
          select: {
            IdLokalizacje: true,
            Miejscowosc: true,
            Ulica: true,
            NumerUlicy: true,
          },
        },
        uzytkownicy: {
          select: {
            IdUzytkownicy: true,
            Email: true,
            Imie: true,
            Nazwisko: true,
            NumerDowodu: true,
            NumerPrawaJazdy: true,
            NumerTelefonu: true,
            Pesel: true,
          },
        },
      },
    })
  ).map(({ IdLokalizacje, IdUzytkownicy, lokalizacje, ...rest }) => ({
    ...rest,
    lokalizacje: {
      IdLokalizacje: lokalizacje.IdLokalizacje,
      Nazwa: `${lokalizacje.Miejscowosc}, ${lokalizacje.Ulica} ${lokalizacje.NumerUlicy}`,
    },
  }));
  const allLocations = (await prisma.lokalizacje.findMany()).map(
    (lokalizacja) => ({
      IdLokalizacje: lokalizacja.IdLokalizacje,
      Nazwa: `${lokalizacja.Miejscowosc}, ${lokalizacja.Ulica} ${lokalizacja.NumerUlicy}`,
    })
  );
  return {
    props: {
      employeesContext: {
        employees: JSON.parse(JSON.stringify(employees)),
        allLocations,
        allJobPositions: await prisma.stanowiska.findMany(),
        allDepartments: (await prisma.oddzialy.findMany()).map(
          ({ IdOddzialy, Nazwa }) => ({
            IdOddzialy,
            Nazwa,
          })
        ),
      },
      carsContext: {
        cars: JSON.parse(JSON.stringify(cars)),
      },
      clientsContext: {
        clients: JSON.parse(JSON.stringify(clients)),
        allLocations,
      },
    },
  };
};

export const getServerSideProps = getDeptEmps;

export default MyDepartmentAdminPage;