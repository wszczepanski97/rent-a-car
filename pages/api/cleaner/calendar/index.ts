import {
  mycie,
  pracownicy,
  samochody,
  uslugi,
  uslugistatus,
  uzytkownicy,
} from "@prisma/client";
import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export type Cleaner =
  | (uzytkownicy & {
      pracownicy: pracownicy[];
    })
  | null;

export type Service =
  | (uslugi & {
      mycie: mycie[];
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
  const cleaner: Cleaner = await prisma.uzytkownicy.findFirst({
    where: {
      IdUzytkownicy: sessionId,
      role_uzytkownik: {
        some: {
          role: {
            Nazwa: "PRACOWNIK MYJNI",
          },
        },
      },
    },
    include: { pracownicy: true },
  });

  if (!cleaner)
    return {
      cars: null,
      cleaner: null,
      services: null,
    };

  const cars: Car[] = await prisma.samochody.findMany({
    include: { uslugi: true },
  });

  const services: Service[] = await prisma.uslugi.findMany({
    where: {
      IdPracownicy_Przypisanie: cleaner?.pracownicy[0].IdPracownicy,
    },
    include: {
      mycie: true,
      uslugistatus: true,
      samochody: true,
    },
  });

  return {
    cars: JSON.parse(JSON.stringify(cars)),
    cleaner: JSON.parse(JSON.stringify(cleaner)),
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
    const { service, washing } = req.body;
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
            mycie: { create: { ...washing } },
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
    const { service, washing } = req.body;
    try {
      const uslugaByIdUslugi = await prisma.uslugi.findFirst({
        where: { IdUslugi: service.IdUslugi },
        include: {
          mycie: true,
        },
      });
      if (!uslugaByIdUslugi) {
        return res.status(400).json({ data: "Nie odnaleziono usługi" });
      }
      const [usluga] = await prisma.$transaction([
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
            mycie: {
              update: {
                data: { ...washing },
                where: {
                  IdMycie: uslugaByIdUslugi.mycie[0].IdMycie,
                },
              },
            },
          },
          include: {
            pracownicy: {
              include: {
                uzytkownicy: true,
              },
            },
            samochody: true,
          },
          where: {
            IdUslugi: service.IdUslugi,
          },
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
            mycie: true,
          },
        }),
      ]);
      return res.status(200).json({ data: { service } });
    } catch (err) {
      console.log(err);
    }
  }
}
