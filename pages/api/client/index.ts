import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { IdKlienci, IdUzytkownicy } = req.body;
    try {
      const klientByIdUzytkownicy = await prisma.klienci.findFirst({
        where: { IdKlienci },
      });
      if (!klientByIdUzytkownicy) {
        return res.status(400).json({ data: "Nie odnaleziono klienta" });
      }
      const [user] = await prisma.$transaction([
        prisma.uzytkownicy.delete({
          where: { IdUzytkownicy },
          include: {
            klienci: true,
          },
        }),
      ]);
      return res.status(200).json({ data: { user } });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "PUT") {
    try {
      const user = await prisma.uzytkownicy.findFirst({
        where: { IdUzytkownicy: req.body.IdUzytkownicy },
      });
      if (!user) {
        return res.status(400).json({ data: "Nie odnaleziono klienta" });
      }
      const [klient] = await prisma.$transaction([
        prisma.uzytkownicy.update({
          data: req.body,
          where: {
            IdUzytkownicy: req.body.IdUzytkownicy,
          },
        }),
      ]);
      return res.status(200).json({ data: { klient } });
    } catch (err) {
      console.log(err);
    }
  }
}
