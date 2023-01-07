import {
  klienci,
  lokalizacje,
  pracownicy,
  relokacje,
  samochody,
  uslugi,
  uzytkownicy,
  wypozyczenia,
} from "@prisma/client";
import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export type Driver =
  | (uzytkownicy & {
      pracownicy: pracownicy[];
    })
  | null;

export type Service = wypozyczenia & {
  relokacje: (relokacje & {
    lokalizacje: lokalizacje | null;
    uslugi:
      | (uslugi & {
          pracownicy: (pracownicy & { uzytkownicy: uzytkownicy }) | null;
          samochody: samochody;
        })
      | null;
    wypozyczenia:
      | (wypozyczenia & {
          klienci: klienci & { uzytkownicy: uzytkownicy };
          relokacje: (relokacje & {
            uslugi:
              | (uslugi & {
                  pracownicy: pracownicy | null;
                  samochody: samochody;
                })
              | null;
            wypozyczenia:
              | (wypozyczenia & {
                  klienci: klienci & { uzytkownicy: uzytkownicy };
                  uslugi: uslugi & { samochody: samochody };
                })
              | null;
          })[];
          uslugi: uslugi & { samochody: samochody };
        })
      | null;
  })[];
  uslugi: uslugi & { samochody: samochody };
};

export type Car =
  | (samochody & {
      uslugi: uslugi[];
    })
  | null;

export const get = async (sessionId?: number) => {
  const driver: Driver = await prisma.uzytkownicy.findFirst({
    where: {
      IdUzytkownicy: sessionId,
      role_uzytkownik: {
        some: {
          role: {
            Nazwa: "KIEROWCA",
          },
        },
      },
    },
    include: { pracownicy: true },
  });

  if (!driver)
    return {
      cars: null,
      driver: null,
      locations: null,
      services: null,
    };

  const cars: Car[] = await prisma.samochody.findMany({
    include: { uslugi: true },
  });

  const locations: lokalizacje[] = await prisma.lokalizacje.findMany();

  const services: Service[] = await prisma.wypozyczenia.findMany({
    where: {
      relokacje: {
        some: {
          uslugi: {
            IdPracownicy_Przypisanie: driver?.pracownicy[0].IdPracownicy,
          },
        },
      },
    },
    include: {
      relokacje: {
        include: {
          lokalizacje: true,
          uslugi: {
            include: {
              samochody: true,
              pracownicy: {
                include: {
                  uzytkownicy: true,
                },
              },
            },
          },
          wypozyczenia: {
            include: {
              klienci: {
                include: {
                  uzytkownicy: true,
                },
              },
              relokacje: {
                include: {
                  uslugi: {
                    include: {
                      samochody: true,
                      pracownicy: true,
                    },
                  },
                  wypozyczenia: {
                    include: {
                      klienci: {
                        include: {
                          uzytkownicy: true,
                        },
                      },
                      uslugi: {
                        include: {
                          samochody: true,
                        },
                      },
                    },
                  },
                },
              },
              uslugi: {
                include: {
                  samochody: true,
                },
              },
            },
          },
        },
      },
      uslugi: {
        include: {
          samochody: true,
        },
      },
    },
  });

  return {
    cars: JSON.parse(JSON.stringify(cars)),
    driver: JSON.parse(JSON.stringify(driver)),
    locations: JSON.parse(JSON.stringify(locations)),
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
    const { service, relocation } = req.body;
    try {
      usluga = await prisma.$transaction([
        prisma.uslugi.create({
          data: {
            DataOd: service.DataOd,
            DataDo: service.DataDo,
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
            relokacje: { create: { ...relocation } },
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
    const { service, relocation } = req.body;
    try {
      const uslugaByIdUslugi = await prisma.uslugi.findFirst({
        where: { IdUslugi: service.IdUslugi },
        include: {
          relokacje: true,
        },
      });
      if (!uslugaByIdUslugi) {
        return res.status(400).json({ data: "Nie odnaleziono usługi" });
      }
      const [usluga] = await prisma.$transaction([
        prisma.uslugi.update({
          data: {
            DataOd: service.DataOd,
            DataDo: service.DataDo,
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
            relokacje: {
              update: {
                data: { ...relocation },
                where: {
                  IdRelokacje: uslugaByIdUslugi.relokacje[0].IdRelokacje,
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
    console.log(IdUslugi);
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
