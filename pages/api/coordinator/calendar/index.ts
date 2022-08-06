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
                // dodatkoweopcje_wypozyczenia: {
                //   create: {
                //     dodatkoweopcje: {
                //       create: {
                //         ...additionalOptions,
                //       },
                //     },
                //   },
                // },
              },
            },
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({ data: { usluga } });
  }
}
