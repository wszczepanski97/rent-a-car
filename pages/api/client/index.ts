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
      const [klient] = await prisma.$transaction([
        prisma.klienci.delete({ where: { IdKlienci } }),
      ]);
      await prisma.$transaction([
        prisma.role_uzytkownik.delete({
          where: { IdUzytkownicy_IdRole: { IdRole: 5, IdUzytkownicy } },
        }),
      ]);
      const [uzytkownik] = await prisma.$transaction([
        prisma.uzytkownicy.delete({ where: { IdUzytkownicy } }),
      ]);
      return res.status(200).json({ data: { klient, uzytkownik } });
    } catch (err) {
      console.log(err);
    }
  }
}
