import { relokacje, samochody, uslugi, uslugistatus } from "@prisma/client";
import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const serviceParser = (
    service: uslugi & {
      samochody: samochody;
      uslugistatus: uslugistatus;
      relokacje: relokacje[];
    }
  ) => {
    const {
      samochody: { IdSamochody, Marka, Model },
      relokacje,
      uslugistatus: { Status },
      DataOd,
      DataDo,
      IdPracownicy_Przypisanie,
    } = service;
    return relokacje[0]
      ? {
          IdRelokacje: relokacje[0].IdRelokacje,
          IdUslugi: service.IdUslugi,
          DataOd: new Date(
            new Date(DataOd).getTime() +
              new Date(DataOd).getTimezoneOffset() * 60 * 1000
          ),
          DataDo: new Date(
            new Date(DataDo).getTime() +
              new Date(DataDo).getTimezoneOffset() * 60 * 1000
          ),
          IdPracownicy_Przypisanie,
          IdSamochod: IdSamochody,
          Samochod: `${Marka} ${Model}`,
          Status,
        }
      : null;
  };
  const foundUser = await prisma.pracownicy.findFirst({
    where: {
      IdUzytkownicy: Number(id),
    },
    include: {
      wyplaty: true,
      uslugi: {
        include: {
          relokacje: true,
          samochody: true,
          uslugistatus: true,
        },
      },
    },
  });
  const availableServices = (
    await prisma.uslugi.findMany({
      where: {
        IdPracownicy_Przypisanie: null,
      },
      include: {
        relokacje: true,
        samochody: true,
        uslugistatus: true,
      },
    })
  ).map(serviceParser);
  const mappedMechanicServices = foundUser?.uslugi.map(serviceParser);
  const pastservices = mappedMechanicServices?.filter(
    (service) => service?.Status === "ZAKONCZONE"
  );
  const currentservice = mappedMechanicServices?.filter(
    (service) => service?.Status === "W TRAKCIE"
  )?.[0];
  const futureservices = mappedMechanicServices?.filter(
    (service) =>
      service?.DataOd &&
      service?.DataOd > new Date() &&
      service?.DataDo &&
      service?.DataDo > new Date() &&
      service?.Status === "NOWE"
  );
  const mappedavailableservices = availableServices?.filter(
    (service) =>
      service?.DataOd &&
      service?.DataOd > new Date() &&
      service?.DataDo &&
      service?.DataDo > new Date() &&
      service?.IdPracownicy_Przypisanie === null &&
      (service?.Status === "NOWE" || service?.Status === "DOSTEPNE")
  );
  const data = {
    paychecks:
      foundUser && foundUser.wyplaty.length > 0
        ? JSON.parse(JSON.stringify(foundUser.wyplaty))
        : [],
    pastservices:
      pastservices && pastservices.length > 0
        ? JSON.parse(JSON.stringify(pastservices))
        : [],
    currentservice: currentservice
      ? JSON.parse(JSON.stringify(currentservice))
      : null,
    futureservices:
      futureservices && futureservices.length > 0
        ? JSON.parse(JSON.stringify(futureservices))
        : [],
    availableservices:
      mappedavailableservices && mappedavailableservices.length > 0
        ? JSON.parse(JSON.stringify(mappedavailableservices))
        : [],
  };
  return data;
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.body.IdUslugi) {
      const [usluga] = await prisma.$transaction([
        prisma.uslugi.update({
          where: {
            IdUslugi: req.body.IdUslugi,
          },
          data:
            req.body.type === "FINISH"
              ? {
                  IdUslugaStatus: 4,
                }
              : req.body.type === "UNASSIGN"
              ? {
                  IdUslugaStatus: 3,
                  IdPracownicy_Przypisanie: null,
                }
              : {
                  IdUslugaStatus: 1,
                  IdPracownicy_Przypisanie: req.body.IdPracownicy,
                },
        }),
      ]);
      return res.status(200).json({ data: usluga });
    }
  } catch (err) {
    console.log(err);
  }
}

async function Delete(req: NextApiRequest, res: NextApiResponse) {
  const { IdRelokacje } = req.body;
  const relokacjeByIdRelokacje = await prisma.relokacje.findFirst({
    where: { IdRelokacje },
  });
  if (!relokacjeByIdRelokacje) {
    return res.status(400).json({ data: "Nie odnaleziono relokacji." });
  }
  if (req.body.IdUslugi) {
    const [relokacja, usluga] = await prisma.$transaction([
      prisma.relokacje.delete({
        where: { IdRelokacje },
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
    return res.status(200).json({ data: relokacja, usluga });
  } else {
    const [relokacja] = await prisma.$transaction([
      prisma.relokacje.delete({
        where: { IdRelokacje },
        include: { uslugi: true },
      }),
    ]);
    return res.status(200).json({ data: relokacja });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      return res.status(200).json(await get(req, res));
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "PUT") {
    try {
      await put(req, res);
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "DELETE") {
    try {
      await Delete(req, res);
    } catch (err) {
      console.log(err);
    }
  }
}
