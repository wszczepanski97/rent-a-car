import { prisma } from "db";
import generator from "generate-password";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const [klient] = await prisma.$transaction([
      prisma.klienci.create({
        data: {
          ProcentRabatu: req.body.ProcentRabatu,
          lokalizacje: {
            connect: {
              IdLokalizacje: req.body.lokalizacje.IdLokalizacje,
            },
          },
          uzytkownicy: {
            create: {
              ...req.body.uzytkownicy,
              NumerDowodu: req.body.uzytkownicy.NumerDowodu.toUpperCase(),
              Aktywny: true,
              Haslo: generator.generate({
                length: 12,
                numbers: true,
              }),
              Login: `s${Math.floor(Math.random() * 100000)}`,
            },
          },
        },
      }),
    ]);
    return res.status(200).json({ data: { klient } });
  } else if (req.method === "DELETE") {
    try {
      const clientByIdKlienci = await prisma.klienci.findFirst({
        where: { IdKlienci: req.body["0"].IdKlienci },
      });
      if (!clientByIdKlienci) {
        return res.status(400).json({ data: "Nie odnaleziono klienta" });
      }
      const [klient] = await prisma.$transaction([
        prisma.klienci.delete({
          where: { IdKlienci: req.body["0"].IdKlienci },
        }),
        prisma.uzytkownicy.delete({
          where: { IdUzytkownicy: req.body["0"].uzytkownicy.IdUzytkownicy },
        }),
      ]);
      return res.status(200).json({ data: { klient } });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "PUT") {
    try {
      const employeeByIdUzytkownicy = await prisma.pracownicy.findFirst({
        where: { IdUzytkownicy: req.body.uzytkownicy.IdUzytkownicy },
      });
      if (!employeeByIdUzytkownicy) {
        return res.status(400).json({ data: "Nie odnaleziono pracownika" });
      }
      const [coordinator] = await prisma.$transaction([
        prisma.pracownicy.update({
          data: {
            stanowiska: {
              connect: {
                IdStanowiska: req.body.stanowiska.IdStanowiska,
              },
            },
            uzytkownicy: {
              update: {
                ...req.body.uzytkownicy,
              },
            },
          },
          where: {
            IdPracownicy: employeeByIdUzytkownicy.IdPracownicy,
          },
        }),
      ]);
      return res.status(200).json({ data: { coordinator } });
    } catch (err) {
      console.log(err);
    }
  }
}
