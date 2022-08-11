import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { IdPracownicy, IdUzytkownicy } = req.body;
    try {
      const klientByIdUzytkownicy = await prisma.pracownicy.findFirst({
        where: { IdPracownicy },
      });
      if (!klientByIdUzytkownicy) {
        return res.status(400).json({ data: "Nie odnaleziono klienta" });
      }
      const [user] = await prisma.$transaction([
        prisma.uzytkownicy.delete({
          where: { IdUzytkownicy },
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
      const user = await prisma.uzytkownicy.findFirst({
        where: { IdUzytkownicy: req.body.IdUzytkownicy },
      });
      if (!user) {
        return res.status(400).json({ data: "Nie odnaleziono koordynatora" });
      }
      const [coordinator] = await prisma.$transaction([
        prisma.uzytkownicy.update({
          data: req.body,
          where: {
            IdUzytkownicy: req.body.IdUzytkownicy,
          },
        }),
      ]);
      return res.status(200).json({ data: { coordinator } });
    } catch (err) {
      console.log(err);
    }
  }
}
