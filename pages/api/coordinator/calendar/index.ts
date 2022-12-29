import {
  dodatkoweopcje,
  dodatkoweopcje_wypozyczenia,
  klienci,
  lokalizacje,
  mycie,
  pracownicy,
  relokacje,
  role,
  role_stanowisko,
  samochody,
  stanowiska,
  uslugi,
  uslugistatus,
  uszkodzenia,
  uzytkownicy,
  wypozyczenia,
} from "@prisma/client";
import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { UslugaType } from "templates/coordinator/calendar/ui/calendarsection/organisms/add-event.component";

export type Service = uslugi & {
  mycie: mycie[];
  pracownicy:
    | (pracownicy & {
        uzytkownicy: uzytkownicy;
      })
    | null;
  relokacje: (relokacje & {
    uslugi: uslugi | null;
    wypozyczenia: wypozyczenia | null;
    lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior: lokalizacje | null;
    lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie: lokalizacje | null;
    pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior: Employee | null;
    pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie: Employee | null;
  })[];
  samochody: samochody;
  uslugistatus: uslugistatus;
  uszkodzenia: uszkodzenia[];
  wypozyczenia: (wypozyczenia & {
    dodatkoweopcje_wypozyczenia: (dodatkoweopcje_wypozyczenia & {
      dodatkoweopcje: dodatkoweopcje;
    })[];
    klienci: klienci & {
      uzytkownicy: uzytkownicy;
    };
    relokacje: (relokacje & {
      lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior: lokalizacje | null;
      lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie: lokalizacje | null;
      pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior: Employee | null;
      pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie: Employee | null;
    })[];
  })[];
};

export type Client = klienci & {
  uzytkownicy: uzytkownicy;
  wypozyczenia: (wypozyczenia & {
    uslugi: uslugi;
  })[];
};

export type Employee = pracownicy & {
  stanowiska: stanowiska & {
    role_stanowisko: (role_stanowisko & {
      role: role;
    })[];
  };
  uslugi: uslugi[];
  uzytkownicy: uzytkownicy;
};

export type Car = samochody & {
  uslugi: uslugi[];
};

export const get = async () => {
  const services: Service[] = await prisma.uslugi.findMany({
    include: {
      mycie: true,
      uszkodzenia: true,
      pracownicy: {
        include: {
          uzytkownicy: true,
        },
      },
      wypozyczenia: {
        include: {
          dodatkoweopcje_wypozyczenia: {
            include: {
              dodatkoweopcje: true,
            },
          },
          klienci: {
            include: {
              uzytkownicy: true,
            },
          },
          relokacje: {
            include: {
              lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior: true,
              lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie:
                true,
              pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior: {
                include: {
                  stanowiska: {
                    include: {
                      role_stanowisko: {
                        include: {
                          role: true,
                        },
                      },
                    },
                  },
                  uslugi: true,
                  uzytkownicy: true,
                },
              },
              pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie: {
                include: {
                  stanowiska: {
                    include: {
                      role_stanowisko: {
                        include: {
                          role: true,
                        },
                      },
                    },
                  },
                  uslugi: true,
                  uzytkownicy: true,
                },
              },
            },
          },
        },
      },
      relokacje: {
        include: {
          uslugi: true,
          wypozyczenia: true,
          lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior: true,
          lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie: true,
          pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior: {
            include: {
              stanowiska: {
                include: {
                  role_stanowisko: {
                    include: {
                      role: true,
                    },
                  },
                },
              },
              uslugi: true,
              uzytkownicy: true,
            },
          },
          pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie: {
            include: {
              stanowiska: {
                include: {
                  role_stanowisko: {
                    include: {
                      role: true,
                    },
                  },
                },
              },
              uslugi: true,
              uzytkownicy: true,
            },
          },
        },
      },
      uslugistatus: true,
      samochody: true,
    },
  });
  const clients: Client[] = await prisma.klienci.findMany({
    where: { uzytkownicy: { Aktywny: true } },
    include: { wypozyczenia: { include: { uslugi: true } }, uzytkownicy: true },
  });
  const employees: Employee[] = await prisma.pracownicy.findMany({
    where: { uzytkownicy: { Aktywny: true } },
    include: {
      uzytkownicy: true,
      uslugi: true,
      stanowiska: {
        include: {
          role_stanowisko: {
            include: {
              role: true,
            },
          },
        },
      },
    },
  });
  const cars: Car[] = await prisma.samochody.findMany({
    include: { uslugi: true },
  });
  const insurances = await prisma.ubezpieczenia.findMany();
  const additionalRentOptions = await prisma.dodatkoweopcje.findMany();
  const locations = await prisma.lokalizacje.findMany();
  return {
    services: JSON.parse(JSON.stringify(services)),
    cars: JSON.parse(JSON.stringify(cars)),
    clients: JSON.parse(JSON.stringify(clients)),
    employees: JSON.parse(JSON.stringify(employees)),
    insurances: JSON.parse(JSON.stringify(insurances)),
    additionalRentOptions: JSON.parse(JSON.stringify(additionalRentOptions)),
    locations: JSON.parse(JSON.stringify(locations)),
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(200).json({ ...(await get()) });
  } else if (req.method === "POST") {
    let usluga, uslugaPodstawienie, uslugaOdbior;
    if (req.body.type === UslugaType.WYPOŻYCZENIE) {
      const { service, rent, relocations, additionalOptions } = req.body;
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
            include: {
              pracownicy: true,
              samochody: true,
              uslugistatus: true,
              relokacje: true,
              wypozyczenia: true,
            },
          }),
        ]);
        if (relocations.Podstawienie) {
          uslugaPodstawienie = await prisma.$transaction([
            prisma.uslugi.create({
              data: {
                DataOd: relocations.Podstawienie.DataOd,
                DataDo: relocations.Podstawienie.DataDo,
                Opis: null,
                uslugistatus: { connect: { IdUslugiStatus: 1 } },
                samochody: {
                  connect: { IdSamochody: service.IdSamochody },
                },
                relokacje: {
                  create: {
                    IdPracownicy_Podstawienie:
                      relocations.Podstawienie.IdPracownicy_Podstawienie,
                    IdLokalizacje_Podstawienie:
                      relocations.Podstawienie.IdLokalizacje_Podstawienie,
                    CzasDojazdu_Podstawienie:
                      relocations.Podstawienie.CzasDojazdu_Podstawienie,
                    IdWypozyczenia: usluga[0].wypozyczenia[0].IdWypozyczenia,
                    Typ_Relokacja: relocations.Podstawienie.Typ_Relokacja,
                  },
                },
              },
              include: {
                pracownicy: true,
                samochody: true,
                uslugistatus: true,
                wypozyczenia: true,
                relokacje: true,
              },
            }),
          ]);
        }
        if (relocations.Odbior) {
          uslugaOdbior = await prisma.$transaction([
            prisma.uslugi.create({
              data: {
                DataOd: relocations.Odbior.DataOd,
                DataDo: relocations.Odbior.DataDo,
                Opis: null,
                uslugistatus: { connect: { IdUslugiStatus: 1 } },
                samochody: {
                  connect: { IdSamochody: service.IdSamochody },
                },
                relokacje: {
                  create: {
                    IdPracownicy_Odbior: relocations.Odbior.IdPracownicy_Odbior,
                    IdLokalizacje_Odbior:
                      relocations.Odbior.IdLokalizacje_Odbior,
                    CzasDojazdu_Odbior: relocations.Odbior.CzasDojazdu_Odbior,
                    IdWypozyczenia: usluga[0].wypozyczenia[0].IdWypozyczenia,
                    Typ_Relokacja: relocations.Odbior.Typ_Relokacja,
                  },
                },
              },
              include: {
                pracownicy: true,
                samochody: true,
                uslugistatus: true,
                wypozyczenia: true,
                relokacje: true,
              },
            }),
          ]);
        }
      } catch (err) {
        console.log(err);
      }
      return res
        .status(200)
        .json({ data: { usluga, uslugaPodstawienie, uslugaOdbior } });
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
            include: {
              pracownicy: true,
              samochody: true,
              uslugistatus: true,
              mycie: true,
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
            include: {
              pracownicy: true,
              samochody: true,
              uslugistatus: true,
              uszkodzenia: true,
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
      console.log(req.body);
      const { service, rent, relocations, additionalOptions } = req.body;
      try {
        const uslugaByIdUslugi = await prisma.uslugi.findFirst({
          where: { IdUslugi: service.IdUslugi },
          include: {
            wypozyczenia: {
              include: {
                relokacje: true,
              },
            },
          },
        });
        const relokacjaPodstawienie =
          uslugaByIdUslugi?.wypozyczenia[0].relokacje.find(
            (relocation) => relocation.Typ_Relokacja === "Podstawienie"
          );
        const relokacjaOdbior =
          uslugaByIdUslugi?.wypozyczenia[0].relokacje.find(
            (relocation) => relocation.Typ_Relokacja === "Odbior"
          );
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
              Opis: service.Opis || null,
              uslugistatus: { connect: { IdUslugiStatus: 1 } },
              samochody: {
                connect: {
                  IdSamochody: service.IdSamochody,
                },
              },
              wypozyczenia: {
                update: {
                  data: {
                    ...rent,
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
          prisma.dodatkoweopcje_wypozyczenia.deleteMany({
            where: {
              Wypozyczenia_Id: uslugaByIdUslugi.wypozyczenia[0].IdWypozyczenia,
            },
          }),
          prisma.dodatkoweopcje_wypozyczenia.createMany({
            data: additionalOptions.map((option: dodatkoweopcje) => ({
              DodatkoweOpcje_Id: option.IdDodatkoweOpcje,
              Wypozyczenia_Id: uslugaByIdUslugi.wypozyczenia[0].IdWypozyczenia,
            })),
          }),
          ...(relokacjaPodstawienie
            ? [
                prisma.uslugi.update({
                  data: {
                    DataOd: relocations.Podstawienie.DataOd,
                    DataDo: relocations.Podstawienie.DataDo,
                    Opis: null,
                    uslugistatus: { connect: { IdUslugiStatus: 1 } },
                    samochody: {
                      connect: { IdSamochody: service.IdSamochody },
                    },
                    relokacje: {
                      update: {
                        data: {
                          IdPracownicy_Podstawienie:
                            relocations.Podstawienie.IdPracownicy_Podstawienie,
                          IdLokalizacje_Podstawienie:
                            relocations.Podstawienie.IdLokalizacje_Podstawienie,
                          CzasDojazdu_Podstawienie:
                            relocations.Podstawienie.CzasDojazdu_Podstawienie,
                          IdWypozyczenia:
                            uslugaByIdUslugi.wypozyczenia[0].IdWypozyczenia,
                          Typ_Relokacja: relocations.Podstawienie.Typ_Relokacja,
                        },
                        where: {
                          IdRelokacje: relokacjaPodstawienie.IdRelokacje,
                        },
                      },
                    },
                  },
                  where: {
                    IdUslugi: relokacjaPodstawienie.IdUslugi!,
                  },
                }),
              ]
            : []),
          ...(relokacjaOdbior
            ? [
                prisma.uslugi.update({
                  data: {
                    DataOd: relocations.Odbior.DataOd,
                    DataDo: relocations.Odbior.DataDo,
                    Opis: null,
                    uslugistatus: { connect: { IdUslugiStatus: 1 } },
                    samochody: {
                      connect: { IdSamochody: service.IdSamochody },
                    },
                    relokacje: {
                      update: {
                        data: {
                          IdPracownicy_Odbior:
                            relocations.Odbior.IdPracownicy_Odbior,
                          IdLokalizacje_Odbior:
                            relocations.Odbior.IdLokalizacje_Odbior,
                          CzasDojazdu_Odbior:
                            relocations.Odbior.CzasDojazdu_Odbior,
                          IdWypozyczenia:
                            uslugaByIdUslugi.wypozyczenia[0].IdWypozyczenia,
                          Typ_Relokacja: relocations.Odbior.Typ_Relokacja,
                        },
                        where: {
                          IdRelokacje: relokacjaOdbior.IdRelokacje,
                        },
                      },
                    },
                  },
                  where: {
                    IdUslugi: relokacjaOdbior.IdUslugi!,
                  },
                }),
              ]
            : []),
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
            include: {
              pracownicy: true,
              samochody: true,
              uslugistatus: true,
              mycie: true,
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
            include: {
              pracownicy: true,
              samochody: true,
              uslugistatus: true,
              uszkodzenia: true,
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
    if (type === UslugaType.WYPOŻYCZENIE) {
      try {
        const serviceByIdUslugi = await prisma.uslugi.findFirst({
          where: { IdUslugi },
          include: {
            wypozyczenia: true,
          },
        });
        if (!serviceByIdUslugi) {
          return res.status(400).json({ data: "Nie odnaleziono usługi." });
        }
        const relocations = await prisma.uslugi.findMany({
          where: {
            relokacje: {
              some: {
                IdWypozyczenia:
                  serviceByIdUslugi.wypozyczenia[0].IdWypozyczenia,
              },
            },
          },
        });
        relocations.forEach(async (relocation) => {
          await prisma.$transaction([
            prisma.uslugi.deleteMany({
              where: { IdUslugi: relocation.IdUslugi },
            }),
          ]);
        });
        const [service] = await prisma.$transaction([
          prisma.uslugi.delete({
            where: { IdUslugi },
            include: {
              wypozyczenia: {
                include: {
                  dodatkoweopcje_wypozyczenia: true,
                  relokacje: {
                    include: {
                      uslugi: true,
                    },
                  },
                },
              },
            },
          }),
        ]);
        return res.status(200).json({ data: { service, relocations } });
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
