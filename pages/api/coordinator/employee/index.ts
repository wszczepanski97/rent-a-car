import { prisma } from "db";
import generator from "generate-password";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const [pracownik] = await prisma.$transaction([
      prisma.pracownicy.create({
        data: {
          stanowiska: {
            connect: {
              IdStanowiska: req.body.stanowiska.IdStanowiska,
            },
          },
          uzytkownicy: {
            create: {
              ...req.body.uzytkownicy,
              Aktywny: true,
              Haslo: generator.generate({
                length: 12,
                numbers: true,
              }),
              Login: `s${Math.floor(Math.random() * 100000)}`,
              Salt: "salt",
            },
          },
        },
      }),
    ]);
    const [oddzial] = await prisma.$transaction([
      prisma.oddzialy_hist.create({
        data: {
          OdKiedy: req.body.oddzialy_hist.OdKiedy,
          DoKiedy: req.body.oddzialy_hist.DoKiedy,
          IdOddzialy: req.body.oddzialy.IdOddzialy,
          IdPracownicy: pracownik.IdPracownicy,
        },
      }),
    ]);
    return res.status(200).json({ data: { pracownik, oddzial } });
  } else if (req.method === "DELETE") {
    try {
      const employeeByIdUzytkownicy = await prisma.pracownicy.findFirst({
        where: { IdUzytkownicy: req.body["0"].uzytkownicy.IdUzytkownicy },
      });
      if (!employeeByIdUzytkownicy) {
        return res.status(400).json({ data: "Nie odnaleziono pracownika" });
      }
      const [user] = await prisma.$transaction([
        prisma.uzytkownicy.delete({
          where: { IdUzytkownicy: req.body["0"].uzytkownicy.IdUzytkownicy },
          include: {
            pracownicy: true,
          },
        }),
      ]);
      return res.status(200).json({ data: { user } });
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
