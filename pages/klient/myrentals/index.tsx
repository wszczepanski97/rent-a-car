import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { PastRentalSection } from "templates/klient/myrentals";
import { prisma } from "../../../db";

const MyRentalsPage: NextPage<MyRentalsPageProps> = ({ rentals }) => {
  return (
    <>
      <PastRentalSection rentals={rentals} />
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
  const rentals = (
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
                CenaZaDzien: true,
                Marka: true,
                Model: true,
              },
            },
          },
        },
      },
    })
  ).map(
    (
      {
        DataDo,
        DataOd,
        Kwota,
        uslugi: {
          samochody: { CenaZaDzien, Marka, Model },
        },
      },
      index
    ) => ({
      Id: index + 1,
      DataDo,
      DataOd,
      Kwota,
      Samochod: `${Marka} ${Model}`,
      CenaZaDzien,
    })
  );
  return {
    props: {
      rentals: JSON.parse(JSON.stringify(rentals)),
    },
  };
};

export type MyRentalsPageProps = {
  rentals: ClientRental[];
};

export type ClientRental = {
  Id: number;
  DataDo: Date;
  DataOd: Date;
  Kwota: number;
  Samochod: string;
  CenaZaDzien: number;
};

export const getServerSideProps = getClientRentals;

export default MyRentalsPage;
