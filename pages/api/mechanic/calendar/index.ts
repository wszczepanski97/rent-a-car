import {
  pracownicy,
  samochody,
  uslugi,
  uslugistatus,
  uszkodzenia,
  uzytkownicy,
} from "@prisma/client";
import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export type Mechanic =
  | (uzytkownicy & {
      pracownicy: pracownicy[];
    })
  | null;

export type Service =
  | (uslugi & {
      uszkodzenia: uszkodzenia[];
      samochody: samochody;
      uslugistatus: uslugistatus;
    })
  | null;

export type Car =
  | (samochody & {
      uslugi: uslugi[];
    })
  | null;

export const get = async (sessionId?: number) => {
  const mechanic: Mechanic = await prisma.uzytkownicy.findFirst({
    where: {
      IdUzytkownicy: sessionId,
      role_uzytkownik: {
        some: {
          role: {
            Nazwa: "MECHANIK",
          },
        },
      },
    },
    include: { pracownicy: true },
  });

  if (!mechanic)
    return {
      cars: null,
      mechanic: null,
      services: null,
    };

  const cars: Car[] = await prisma.samochody.findMany({
    include: { uslugi: true },
  });

  const services: Service[] = await prisma.uslugi.findMany({
    where: {
      IdPracownicy_Przypisanie: mechanic?.pracownicy[0].IdPracownicy,
    },
    include: {
      uszkodzenia: true,
      uslugistatus: true,
      samochody: true,
    },
  });
  return {
    cars: JSON.parse(JSON.stringify(cars)),
    mechanic: JSON.parse(JSON.stringify(mechanic)),
    services: JSON.parse(JSON.stringify(services)),
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    return res.status(200).json({ ...(await get(session?.user.id)) });
  } else if (req.method === "POST") {
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
          include: {
            pracownicy: {
              include: {
                uzytkownicy: true,
              },
            },
            samochody: true,
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
      const [deletedUsluga, usluga] = await prisma.$transaction([
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
          include: {
            pracownicy: {
              include: {
                uzytkownicy: true,
              },
            },
            samochody: true,
          },
          where: { IdUslugi: service.IdUslugi },
        }),
      ]);
      return res.status(200).json({ data: { deletedUsluga, usluga } });
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
