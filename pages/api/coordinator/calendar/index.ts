import { dodatkoweopcje } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { UslugaType } from "templates/admin/calendar/ui/calendarsection/organisms/add-event.component";
import { prisma } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let usluga;
    if (req.body.type === UslugaType.WYPOŻYCZENIE) {
      const { service, rent, additionalOptions } = req.body;
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
              samochody: {
                connect: { IdSamochody: service.IdSamochody },
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
    } else if (req.body.type === UslugaType.MYCIE) {
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
          }),
        ]);
      } catch (err) {
        console.log(err);
      }
      return res.status(200).json({ data: { usluga } });
    } else if (req.body.type === UslugaType.NAPRAWA) {
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
    }
  } else if (req.method === "PUT") {
    if (req.body.type === UslugaType.WYPOŻYCZENIE) {
      const { service, rent, additionalOptions } = req.body;
      try {
        const uslugaByIdUslugi = await prisma.uslugi.findFirst({
          where: { IdUslugi: service.IdUslugi },
          include: {
            wypozyczenia: true,
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
              IdPracownicy_Przypisanie: service.IdPracownicy_Przypisanie,
              wypozyczenia: {
                update: {
                  data: {
                    ...rent,
                    dodatkoweopcje_wypozyczenia: {
                      createMany: {
                        data: additionalOptions.map(
                          (option: dodatkoweopcje) => ({
                            DodatkoweOpcje_Id: option.IdDodatkoweOpcje,
                          })
                        ),
                      },
                    },
                  },
                  where: {
                    IdWypozyczenia:
                      uslugaByIdUslugi.wypozyczenia[0].IdWypozyczenia,
                  },
                },
              },
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
    } else if (req.body.type === UslugaType.MYCIE) {
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
              IdPracownicy_Przypisanie: service.IdPracownicy_Przypisanie,
              mycie: {
                update: {
                  data: { ...washing },
                  where: {
                    IdMycie: uslugaByIdUslugi.mycie[0].IdMycie,
                  },
                },
              },
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
    } else if (req.body.type === UslugaType.NAPRAWA) {
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
              IdPracownicy_Przypisanie: service.IdPracownicy_Przypisanie,
              uszkodzenia: {
                update: {
                  data: { ...repair },
                  where: {
                    IdUszkodzenia:
                      uslugaByIdUslugi.uszkodzenia[0].IdUszkodzenia,
                  },
                },
              },
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
    }
  } else if (req.method === "DELETE") {
    const { IdUslugi, type } = req.body;
    console.log(req.body);
    if (type === UslugaType.WYPOŻYCZENIE) {
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
              wypozyczenia: {
                include: {
                  dodatkoweopcje_wypozyczenia: true,
                },
              },
              relokacje: true,
            },
          }),
        ]);
        return res.status(200).json({ data: { service } });
      } catch (err) {
        console.log(err);
      }
    } else if (type === UslugaType.MYCIE) {
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
    } else if (type === UslugaType.NAPRAWA) {
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
}
