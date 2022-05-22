import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const [uzytkownik, pracownik] = await prisma.$transaction([
    //   prisma.uslugi.create({
    //     data: {
    //       Opis,
    //       lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Odbior: {
    //         connect: {
    //           IdLokalizacje: klient?.IdLokalizacje,
    //         },
    //       },
    //       lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie: {
    //         connect: {
    //           IdLokalizacje: klient?.IdLokalizacje,
    //         },
    //       },
    //       samochody: {
    //         connect: {
    //           IdSamochody,
    //         },
    //       },
    //       wypozyczenia: {
    //         create: {
    //           DataOd: new Date(DataOd),
    //           DataDo: new Date(DataDo),
    //           IloscDni,
    //           Kwota,
    //           IdKlienci: klient.IdKlienci,
    //           IdUbezpieczenia,
    //           IdWypozyczeniaStatus: 1,
    //           KwotaPoRabacie: null,
    //         },
    //       },
    //     },
    //   }),
    // ]);
  } else if (req.method === "DELETE") {
    const { IdPracownicy, IdUzytkownicy } = req.body;
    try {
      const employeeByIdUzytkownicy = await prisma.pracownicy.findFirst({
        where: { IdPracownicy },
      });
      if (!employeeByIdUzytkownicy) {
        return res.status(400).json({ data: "Nie odnaleziono pracownika" });
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
    const { IdUzytkownicy } = req.body;
    try {
      const employeeByIdUzytkownicy = await prisma.pracownicy.findFirst({
        where: { IdUzytkownicy },
      });
      if (!employeeByIdUzytkownicy) {
        return res.status(400).json({ data: "Nie odnaleziono pracownika" });
      }
      const [admin] = await prisma.$transaction([
        prisma.pracownicy.update({
          data: req.body,
          where: {
            IdPracownicy: employeeByIdUzytkownicy.IdPracownicy,
          },
        }),
      ]);
      return res.status(200).json({ data: { admin } });
    } catch (err) {
      console.log(err);
    }
  }
}
