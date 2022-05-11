import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let usluga;
    const {
      DataOd,
      DataDo,
      Opis,
      Kwota,
      IloscDni,
      IdUzytkownicy,
      IdUbezpieczenia,
      IdSamochody,
    } = req.body;
    if (!IdSamochody) {
      return res.status(400).json({ data: "Nie odnaleziono samochodu" });
    }
    try {
      const klient = await prisma.klienci.findFirst({
        where: {
          IdUzytkownicy,
        },
      });
      if (!klient) {
        return res.status(400).json({ data: "Nie odnaleziono klienta" });
      }
      usluga = await prisma.$transaction([
        prisma.uslugi.create({
          data: {
            Opis,
            lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Odbior: {
              connect: {
                IdLokalizacje: klient?.IdLokalizacje,
              },
            },
            lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie: {
              connect: {
                IdLokalizacje: klient?.IdLokalizacje,
              },
            },
            samochody: {
              connect: {
                IdSamochody,
              },
            },
            wypozyczenia: {
              create: {
                DataOd: new Date(DataOd),
                DataDo: new Date(DataDo),
                IloscDni,
                Kwota,
                IdKlienci: klient.IdKlienci,
                IdUbezpieczenia,
                IdWypozyczeniaStatus: 1,
                KwotaPoRabacie: null,
              },
            },
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({ data: { usluga } });
  } else if (req.method === "DELETE") {
    let usluga;
    let wypozyczenie;
    const { IdWypozyczenia, IdUslugi } = req.body;
    if (!IdUslugi) {
      return res.status(400).json({ data: "Nie odnaleziono usługi" });
    }
    if (!IdWypozyczenia) {
      return res.status(400).json({ data: "Nie odnaleziono wypożyczenia" });
    }
    try {
      wypozyczenie = await prisma.wypozyczenia.findFirst({
        where: {
          IdWypozyczenia,
        },
      });
      if (!wypozyczenie) {
        return res.status(400).json({ data: "Nie odnaleziono wypożyczenia" });
      }
      await prisma.$transaction([
        prisma.wypozyczenia.delete({
          where: {
            IdWypozyczenia,
          },
        }),
      ]);
      usluga = await prisma.uslugi.findFirst({
        where: {
          IdUslugi,
        },
      });
      if (!usluga) {
        return res.status(400).json({ data: "Nie odnaleziono usługi" });
      } else {
        await prisma.$transaction([
          prisma.uslugi.delete({
            where: {
              IdUslugi,
            },
          }),
        ]);
      }
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({ data: { usluga } });
  }
}
