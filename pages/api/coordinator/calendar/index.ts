import { dodatkoweopcje } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  if (req.method === "POST") {
    let usluga;
    const { service, rent, additionalOptions } = req.body;
    try {
      usluga = await prisma.$transaction([
        prisma.uslugi.create({
          data: {
            DataOd: new Date(service.DataOd),
            DataDo: new Date(service.DataDo),
            Opis: service.Opis || null,
            uslugistatus: {
              connect: {
                IdUslugiStatus: 1,
              },
            },
            samochody: {
              connect: {
                IdSamochody: service.IdSamochody,
              },
            },
            wypozyczenia: {
              create: {
                ...rent,
                dodatkoweopcje_wypozyczenia: {
                  createMany: {
                    data: additionalOptions.map((option: dodatkoweopcje) => ({
                      DodatkoweOpcje_Id: option.IdDodatkoweOpcje,
                    })),
                  },
                },
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
    const { IdUslugi } = req.body;
    try {
      const serviceByIdUslugi = await prisma.uslugi.findFirst({
        where: { IdUslugi },
      });
      if (!serviceByIdUslugi) {
        return res.status(400).json({ data: "Nie odnaleziono usługi." });
      }
      const [service] = await prisma.$transaction([
        prisma.uslugi.delete({
          where: { IdUslugi },
          include: {
            mycie: true,
            wypozyczenia: {
              include: {
                dodatkoweopcje_wypozyczenia: true,
              },
            },
            uszkodzenia: true,
            relokacje: true,
          },
        }),
      ]);
      return res.status(200).json({ data: { service } });
    } catch (err) {
      console.log(err);
    }
  }
}
