import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let usluga;
    const { service, repair } = req.body;
    try {
      usluga = await prisma.$transaction([
        prisma.uslugi.create({
          data: {
            DataOd: new Date(
              new Date(service.DataOd).getTime() -
                new Date(service.DataOd).getTimezoneOffset() * 60 * 1000
            ),
            DataDo: new Date(
              new Date(service.DataDo).getTime() -
                new Date(service.DataDo).getTimezoneOffset() * 60 * 1000
            ),
            Opis: service.Opis || null,
            uslugistatus: { connect: { IdUslugiStatus: 1 } },
            pracownicy: {
              connect: {
                IdPracownicy: service.IdPracownicy_Przypisanie,
              },
            },
            samochody: {
              connect: { IdSamochody: service.IdSamochody },
            },
            uszkodzenia: { create: { ...repair } },
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({ data: { usluga } });
  } else if (req.method === "PUT") {
    const { service, repair } = req.body;
    try {
      const uslugaByIdUslugi = await prisma.uslugi.findFirst({
        where: { IdUslugi: service.IdUslugi },
        include: {
          uszkodzenia: true,
        },
      });
      if (!uslugaByIdUslugi) {
        return res.status(400).json({ data: "Nie odnaleziono usługi" });
      }
      console.log(uslugaByIdUslugi.uszkodzenia[0].IdUszkodzenia);
      console.log({ ...repair });
      const [usluga] = await prisma.$transaction([
        prisma.uszkodzenia.delete({
          where: {
            IdUszkodzenia: uslugaByIdUslugi.uszkodzenia[0].IdUszkodzenia,
          },
        }),
        prisma.uslugi.update({
          data: {
            DataOd: new Date(
              new Date(service.DataOd).getTime() -
                new Date(service.DataOd).getTimezoneOffset() * 60 * 1000
            ),
            DataDo: new Date(
              new Date(service.DataDo).getTime() -
                new Date(service.DataDo).getTimezoneOffset() * 60 * 1000
            ),
            Opis: service.Opis,
            samochody: {
              connect: {
                IdSamochody: service.IdSamochody,
              },
            },
            pracownicy: {
              connect: {
                IdPracownicy: service.IdPracownicy_Przypisanie,
              },
            },
            uszkodzenia: { create: { ...repair } },
          },
          where: { IdUslugi: service.IdUslugi },
        }),
      ]);
      return res.status(200).json({ data: { usluga } });
    } catch (err) {
      console.log(err);
    }
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
            uszkodzenia: true,
          },
        }),
      ]);
      return res.status(200).json({ data: { service } });
    } catch (err) {
      console.log(err);
    }
  }
}
