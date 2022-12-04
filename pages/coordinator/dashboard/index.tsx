import {
  klienci,
  lokalizacje,
  oddzialy,
  pracownicy,
  stanowiska,
} from "@prisma/client";
import { SidebarContextProvider } from "contexts/sidebar.context";
import { prisma } from "db";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import type { ReactElement } from "react";
import { createContext } from "react";
import DeptCarsSection from "templates/coordinator/mydepartment/ui/deptcarsssection/deptcarssection.component";
import DeptClientsSection from "templates/coordinator/mydepartment/ui/deptclientssection/deptclientssection.component";
import DeptEmpsSection from "templates/coordinator/mydepartment/ui/deptempssection/deptempssection.component";
import MyDepartmentCarousel from "templates/coordinator/mydepartment/ui/mydepartmentcarousel/mydepartmentcarousel.component";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";
import styles from "../../../templates/coordinator/mydepartment/ui/mydepartment.module.scss";

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
  CenaZaGodzine: number;
  Marka: string;
  Model: string;
};

export type CarsContextInterface = {
  cars: Car[];
};

export const CarsContext = createContext({} as CarsContextInterface);

type Client = klienci & {
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

const MyDepartmentCoordinatorPage: NextPageWithLayout<
  MyDepartmentPageProps
> = ({ employeesContext, carsContext, clientsContext }) => (
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
  </>
);

MyDepartmentCoordinatorPage.getLayout = (page: ReactElement) => (
  <SidebarContextProvider>
    <Main>
      <Sidebar />
      <Layout>
        <Navbar />
        <div className={styles.myDepartmentLayout}>{page}</div>
        {page}
      </Layout>
    </Main>
  </SidebarContextProvider>
);

const getDeptEmps: GetServerSideProps<MyDepartmentPageProps> = async () => {
  const employees = (
    await prisma.pracownicy.findMany({
      select: {
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
  const clients = await prisma.klienci.findMany({
    include: {
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
  });
  const allLocations = await prisma.lokalizacje.findMany();
  return {
    props: {
      employeesContext: JSON.parse(
        JSON.stringify({
          employees: JSON.parse(JSON.stringify(employees)),
          allLocations,
          allJobPositions: await prisma.stanowiska.findMany(),
          allDepartments: await prisma.oddzialy.findMany(),
        })
      ),
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

export default MyDepartmentCoordinatorPage;
