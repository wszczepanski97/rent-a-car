import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import {
  FutureRentalSection,
  PastRentalSection,
} from "templates/client/myrentals";
import { prisma } from "../../../db";

const MyRentalsPage: NextPage<MyRentalsPageProps> = ({
  futurerentals,
  pastrentals,
}) => {
  return (
    <>
      <FutureRentalSection rentals={futurerentals} />
      <PastRentalSection rentals={pastrentals} />
    </>
  );
};

const getClientRentals: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = await prisma.klienci.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
    },
    select: {
      IdKlienci: true,
    },
  });
  const pastrentals = (
    await prisma.wypozyczenia.findMany({
      where: {
        IdKlienci: userId?.IdKlienci,
        IdWypozyczeniaStatus: 5,
      },
      select: {
        DataOd: true,
        DataDo: true,
        Kwota: true,
        uslugi: {
          select: {
            samochody: {
              select: {
                IdSamochody: true,
                CenaZaDzien: true,
                Marka: true,
                Model: true,
                Zdjecia: true,
              },
            },
          },
        },
      },
    })
  ).map(
    ({
      DataDo,
      DataOd,
      Kwota,
      uslugi: {
        samochody: { IdSamochody, CenaZaDzien, Marka, Model, Zdjecia },
      },
    }) => ({
      DataDo: DataDo.toLocaleDateString(),
      DataOd: DataOd.toLocaleDateString(),
      Kwota,
      Samochod: `${Marka} ${Model}`,
      IdSamochod: IdSamochody,
      CenaZaDzien,
      Zdjecie: Zdjecia?.split(";")[0],
    })
  );
  const futurerentals = (
    await prisma.wypozyczenia.findMany({
      where: {
        IdKlienci: userId?.IdKlienci,
        IdWypozyczeniaStatus: 1,
      },
      select: {
        IdWypozyczenia: true,
        IdUslugi: true,
        DataOd: true,
        DataDo: true,
        Kwota: true,
        uslugi: {
          select: {
            samochody: {
              select: {
                IdSamochody: true,
                CenaZaDzien: true,
                Marka: true,
                Model: true,
                Zdjecia: true,
              },
            },
          },
        },
      },
    })
  ).map(
    ({
      IdWypozyczenia,
      IdUslugi,
      DataDo,
      DataOd,
      Kwota,
      uslugi: {
        samochody: { IdSamochody, CenaZaDzien, Marka, Model, Zdjecia },
      },
    }) => ({
      IdWypozyczenia,
      IdUslugi,
      DataDo: DataDo.toLocaleDateString(),
      DataOd: DataOd.toLocaleDateString(),
      Kwota,
      Samochod: `${Marka} ${Model}`,
      IdSamochod: IdSamochody,
      CenaZaDzien,
      Zdjecie: Zdjecia?.split(";")[0],
    })
  );
  return {
    props: {
      pastrentals: JSON.parse(JSON.stringify(pastrentals)),
      futurerentals: JSON.parse(JSON.stringify(futurerentals)),
    },
  };
};

export type MyRentalsPageProps = {
  pastrentals: PastRental[];
  futurerentals: FutureRental[];
};

export type PastRental = {
  DataDo: string;
  DataOd: string;
  Kwota: number;
  Samochod: string;
  IdSamochod: number;
  CenaZaDzien: number;
  Zdjecie: string | undefined;
};

export type FutureRental = {
  IdWypozyczenia: number;
  IdUslugi: number;
  DataDo: string;
  DataOd: string;
  Kwota: number;
  Samochod: string;
  IdSamochod: number;
  CenaZaDzien: number;
  Zdjecie: string | undefined;
};

export const getServerSideProps = getClientRentals;

export default MyRentalsPage;
