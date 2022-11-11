import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const foundUser = await prisma.pracownicy.findFirst({
      where: {
        IdUzytkownicy: Number(id),
      },
      include: {
        wyplaty: true,
        uslugi: {
          include: {
            uszkodzenia: true,
            samochody: true,
            uslugistatus: true,
          },
        },
      },
    });
    const mappedMechanicServices = foundUser?.uslugi.map((service) => {
      const {
        samochody: { IdSamochody, Marka, Model },
        uszkodzenia,
        uslugistatus: { Status },
        DataOd,
        DataDo,
      } = service;
      return uszkodzenia[0]
        ? {
            IdUszkodzenia: uszkodzenia[0].IdUszkodzenia,
            IdUslugi: service.IdUslugi,
            AutoryzowanySerwis: uszkodzenia[0].AutoryzowanySerwis,
            SamodzielnaNaprawa: uszkodzenia[0].SamodzielnaNaprawa,
            Warsztat: uszkodzenia[0].Warsztat,
            DataOd: new Date(
              new Date(DataOd).getTime() +
                new Date(DataOd).getTimezoneOffset() * 60 * 1000
            ),
            DataDo: new Date(
              new Date(DataDo).getTime() +
                new Date(DataDo).getTimezoneOffset() * 60 * 1000
            ),
            IdSamochod: IdSamochody,
            Samochod: `${Marka} ${Model}`,
            Status,
          }
        : undefined;
    });
    const data = {
      paychecks: foundUser
        ? JSON.parse(JSON.stringify(foundUser.wyplaty))
        : undefined,
      pastservices:
        mappedMechanicServices?.filter((service) => !!service).length !== 0
          ? JSON.parse(
              JSON.stringify(
                mappedMechanicServices?.filter(
                  (service) =>
                    service?.DataOd &&
                    service?.DataOd < new Date() &&
                    service?.DataDo &&
                    service?.DataDo < new Date()
                )
              )
            )
          : undefined,
      currentservice:
        mappedMechanicServices?.filter((service) => !!service).length !== 0
          ? JSON.parse(
              JSON.stringify(
                mappedMechanicServices?.filter(
                  (service) =>
                    service?.DataOd &&
                    service?.DataOd < new Date() &&
                    service?.DataDo &&
                    service?.DataDo > new Date()
                )[0] || ""
              )
            )
          : undefined,
      futureservices:
        mappedMechanicServices?.filter((service) => !!service).length !== 0
          ? JSON.parse(
              JSON.stringify(
                mappedMechanicServices?.filter(
                  (service) =>
                    service?.DataOd &&
                    service?.DataOd > new Date() &&
                    service?.DataDo &&
                    service?.DataDo > new Date()
                )
              )
            )
          : undefined,
      availableservices:
        mappedMechanicServices?.filter((service) => !!service).length !== 0
          ? JSON.parse(
              JSON.stringify(
                mappedMechanicServices?.filter(
                  (service) =>
                    service?.DataOd &&
                    service?.DataOd > new Date() &&
                    foundUser?.uslugi.find(
                      (usluga) => usluga.IdPracownicy_Przypisanie === null
                    )
                )
              )
            )
          : undefined,
      services:
        mappedMechanicServices?.filter((service) => !!service).length !== 0
          ? JSON.parse(JSON.stringify(mappedMechanicServices))
          : undefined,
    };
    return res.status(200).json({ ...data });
  } else if (req.method === "DELETE") {
    try {
      const { IdUszkodzenia } = req.body;
      const repairByIdUszkodzenia = await prisma.uszkodzenia.findFirst({
        where: { IdUszkodzenia },
      });
      if (!repairByIdUszkodzenia) {
        return res.status(400).json({ data: "Nie odnaleziono naprawy." });
      }
      if (req.body.IdUslugi) {
        const [repair, usluga] = await prisma.$transaction([
          prisma.uszkodzenia.delete({
            where: { IdUszkodzenia },
            include: { uslugi: true },
          }),
          prisma.uslugi.update({
            where: {
              IdUslugi: req.body.IdUslugi,
            },
            data: {
              IdUslugaStatus: 5,
            },
          }),
        ]);
        return res.status(200).json({ data: repair, usluga });
      } else {
        const [repair] = await prisma.$transaction([
          prisma.uszkodzenia.delete({
            where: { IdUszkodzenia },
            include: { uslugi: true },
          }),
        ]);
        return res.status(200).json({ data: repair });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
