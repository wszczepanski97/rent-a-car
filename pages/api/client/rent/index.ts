import { equal } from "assert";
import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let usluga;
    if (!req.body.IdSamochody) {
      return res.status(400).json({ data: "Nie odnaleziono samochodu" });
    }
    try {
      const klient = await prisma.klienci.findFirst({
        where: {
          IdUzytkownicy: req.body.IdUzytkownicy,
        },
      });
      if (!klient) {
        return res.status(400).json({ data: "Nie odnaleziono klienta" });
      }
      usluga = await prisma.$transaction([
        prisma.uslugi.create({
          data: {
            DataOd: new Date(req.body.DataOd),
            DataDo: new Date(req.body.DataDo),
            Opis: req.body.Opis,
            IdPracownicy_Przypisanie: undefined,
            uslugistatus: {
              connect: {
                IdUslugiStatus: 1,
              },
            },
            samochody: {
              connect: {
                IdSamochody: req.body.IdSamochody,
              },
            },
            wypozyczenia: {
              create: {
                Kwota: req.body.Kwota,
                KwotaPoRabacie: klient.ProcentRabatu
                  ? req.body.Kwota -
                    0.01 * klient.ProcentRabatu * req.body.Kwota
                  : req.body.Kwota,
                klienci: {
                  connect: {
                    IdKlienci: klient.IdKlienci,
                  },
                },
                ubezpieczenia: {
                  connect: {
                    IdUbezpieczenia: req.body.IdUbezpieczenia,
                  },
                },
                Czy_Odebrac_Auto: false,
                Czy_Podstawic_Auto: false,
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
