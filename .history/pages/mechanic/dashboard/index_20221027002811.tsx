import { wyplaty } from "@prisma/client";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ServicesGrid } from "templates/common/services";
import { NextPageWithLayout } from "types/next";
import { Navbar } from "ui";
import { prisma } from "../../../db";

export type Service = {
  IdUszkodzenia: number;
  IdUslugi: number;
  AutoryzowanySerwis: boolean | null;
  SamodzielnaNaprawa: boolean | null;
  Warsztat: boolean | null;
  DataOd: Date;
  DataDo: Date;
  IdSamochod: number;
  Samochod: string;
  Status: string;
};

export type Services = {
  paychecks?: wyplaty[];
  pastservices?: Service[];
  currentservice?: Service;
  futureservices?: Service[];
  availableservices?: Service[];
};

type DashboardPageProps = {
  // session: Session;
  services: Services;
};

interface ServicesContextInterface {
  services: Services;
  setServices: Dispatch<SetStateAction<Services>>;
}

export const ServicesContext = createContext({} as ServicesContextInterface);

const ServicesContextProvider: FC<ServicesContextInterface> = ({
  services,
  setServices,
  children,
}) => {
  return (
    <ServicesContext.Provider
      value={{
        services,
        setServices,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

const DashboardPage: NextPageWithLayout<DashboardPageProps> = ({
  // session,
  services: initialServices,
}) => {
  const [services, setServices] = useState(initialServices);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`/api/repair?id=${session?.user.id}`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setServices(data);
      } catch (e) {
        console.log(e);
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [services]);
  console.log(services);
  return (
    <ServicesContextProvider services={services} setServices={setServices}>
      <ServicesGrid />
    </ServicesContextProvider>
  );
};

DashboardPage.getLayout = (page: ReactElement) => (
  <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Navbar />
      {page}
    </div>
  </>
);

const getMechanicServices: GetServerSideProps<DashboardPageProps> = async (
  context
) => {
  const session = await getSession(context);
  if (!session?.user.id) {
    return {
      props: {
        services: {},
      },
    };
  }
  const foundUser = await prisma.pracownicy.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
    },
    include: {
      wyplaty: true,
      uslugi: {
        include: {
          uszkodzenia: true,
          samochody: true,
          uslugistatus: true,
        },
      },
    },
  });
  const mappedMechanicServices = foundUser?.uslugi.map((service) => {
    const {
      samochody: { IdSamochody, Marka, Model },
      uszkodzenia,
      uslugistatus: { Status },
      DataOd,
      DataDo,
    } = service;
    return uszkodzenia[0]
      ? {
          IdUszkodzenia: uszkodzenia[0].IdUszkodzenia,
          IdUslugi: service.IdUslugi,
          AutoryzowanySerwis: uszkodzenia[0].AutoryzowanySerwis,
          SamodzielnaNaprawa: uszkodzenia[0].SamodzielnaNaprawa,
          Warsztat: uszkodzenia[0].Warsztat,
          DataOd: new Date(
            new Date(DataOd).getTime() +
              new Date(DataOd).getTimezoneOffset() * 60 * 1000
          ),
          DataDo: new Date(
            new Date(DataDo).getTime() +
              new Date(DataDo).getTimezoneOffset() * 60 * 1000
          ),
          IdSamochod: IdSamochody,
          Samochod: `${Marka} ${Model}`,
          Status,
        }
      : undefined;
  });
  const data = {
    paychecks: foundUser
      ? JSON.parse(JSON.stringify(foundUser.wyplaty))
      : undefined,
    pastservices:
      mappedMechanicServices?.filter((service) => !!service).length !== 0
        ? JSON.parse(
            JSON.stringify(
              mappedMechanicServices?.filter(
                (service) =>
                  service?.DataOd &&
                  service?.DataOd < new Date() &&
                  service?.DataDo &&
                  service?.DataDo < new Date()
              )
            )
          )
        : undefined,
    currentservice:
      mappedMechanicServices?.filter((service) => !!service).length !== 0
        ? JSON.parse(
            JSON.stringify(
              mappedMechanicServices?.filter(
                (service) =>
                  service?.DataOd &&
                  service?.DataOd < new Date() &&
                  service?.DataDo &&
                  service?.DataDo > new Date()
              )[0] || ""
            )
          )
        : undefined,
    futureservices:
      mappedMechanicServices?.filter((service) => !!service).length !== 0
        ? JSON.parse(
            JSON.stringify(
              mappedMechanicServices?.filter(
                (service) =>
                  service?.DataOd &&
                  service?.DataOd > new Date() &&
                  service?.DataDo &&
                  service?.DataDo > new Date()
              )
            )
          )
        : undefined,
    availableservices:
      mappedMechanicServices?.filter((service) => !!service).length !== 0
        ? JSON.parse(
            JSON.stringify(
              mappedMechanicServices?.filter(
                (service) =>
                  service?.DataOd &&
                  service?.DataOd > new Date() &&
                  foundUser?.uslugi.find(
                    (usluga) => usluga.IdPracownicy_Przypisanie === null
                  )
              )
            )
          )
        : undefined,
    services:
      mappedMechanicServices?.filter((service) => !!service).length !== 0
        ? JSON.parse(JSON.stringify(mappedMechanicServices))
        : undefined,
  };
  return {
    props: {
      session,
      services: data,
    },
  };
};

export const getServerSideProps = getMechanicServices;

export default DashboardPage;
