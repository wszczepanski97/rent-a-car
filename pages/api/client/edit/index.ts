import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    Imie,
    Nazwisko,
    Pesel,
    NumerDowodu,
    NumerPrawaJazdy,
    Email,
    NumerTelefonu,
    IdUzytkownicy,
  } = req.body;
  try {
    const klientByIdUzytkownicy = await prisma.klienci.findFirst({
      where: { IdUzytkownicy },
    });
    if (!klientByIdUzytkownicy) {
      return res.status(400).json({ data: "Nie odnaleziono klienta" });
    }
    const [klient] = await prisma.$transaction([
      prisma.klienci.update({
        data: {
          Imie,
          Nazwisko,
          Pesel,
          NumerDowodu,
          NumerPrawaJazdy,
          Email,
          NumerTelefonu,
        },
        where: {
          IdKlienci: klientByIdUzytkownicy.IdKlienci,
        },
      }),
    ]);
    return res.status(200).json({ data: { klient } });
  } catch (err) {
    console.log(err);
  }
}
