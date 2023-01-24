import { prisma } from "db";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { Rental } from "types/rental/rental.type";

const parseRentals: (element: any) => Rental = ({
  IdWypozyczenia,
  IdUslugi,
  Kwota,
  uslugi: {
    DataDo,
    DataOd,
    samochody: { IdSamochody, CenaZaGodzine, Marka, Model, Zdjecia },
  },
}) => ({
  IdWypozyczenia,
  IdUslugi,
  DataDo: DataDo.toLocaleDateString(),
  DataOd: DataOd.toLocaleDateString(),
  Kwota,
  Samochod: `${Marka} ${Model}`,
  IdSamochod: IdSamochody,
  CenaZaGodzine,
  Zdjecie: Zdjecia?.split(";")[0],
});

export const myRentalsServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = await prisma.klienci.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
    },
    select: {
      IdKlienci: true,
    },
  });
  const clientRentals = await prisma.wypozyczenia.findMany({
    where: {
      IdKlienci: userId?.IdKlienci,
    },
    include: {
      uslugi: {
        select: {
          DataOd: true,
          DataDo: true,
          IdUslugaStatus: true,
          samochody: {
            select: {
              IdSamochody: true,
              CenaZaGodzine: true,
              Marka: true,
              Model: true,
              Zdjecia: true,
            },
          },
        },
      },
    },
  });

  const pastrentals = JSON.parse(
    JSON.stringify(
      clientRentals
        .filter((rental) => rental.uslugi.IdUslugaStatus === 4)
        .map(parseRentals)
    )
  );
  const futurerentals = JSON.parse(
    JSON.stringify(
      clientRentals
        .filter((rental) => rental.uslugi.IdUslugaStatus === 1)
        .map(parseRentals)
    )
  );
  return {
    props: { pastrentals, futurerentals, userId, clientRentals, session },
  };
};
