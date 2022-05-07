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
