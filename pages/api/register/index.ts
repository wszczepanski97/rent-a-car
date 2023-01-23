import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      Email,
      Imię,
      Login,
      Hasło,
      role,
      ["Lokalizacja oddziału"]: Lokalizacja,
      ...rest
    } = req.body;
    try {
      if (role === "KLIENT") {
        const klientByEmail = await prisma.klienci.findFirst({
          where: {
            uzytkownicy: {
              Email,
            },
          },
        });
        if (klientByEmail) {
          return res.status(400).json({
            error:
              "Uzytkownik z podanym adresem email istnieje. \nPodaj inny adres email.",
          });
        }
        const klientByLogin = await prisma.klienci.findFirst({
          where: {
            uzytkownicy: {
              Login,
            },
          },
        });
        if (klientByLogin) {
          return res.status(400).json({
            error: "Uzytkownik z podanym loginem istnieje. \nPodaj inny login.",
          });
        }
        const [uzytkownik] = await prisma.$transaction([
          prisma.uzytkownicy.create({
            data: {
              Imie: Imię,
              Login,
              Haslo: Hasło,
              Email,
              Aktywny: true,
              ...rest,
            },
          }),
        ]);
        if (uzytkownik) {
          const role_uzytkownik = await prisma.role_uzytkownik.findFirst({
            where: {
              role: {
                Nazwa: role,
              },
            },
          });
          if (!role_uzytkownik)
            return res.status(500).json({
              data: {
                error: "Wewnętrzny błąd serwera, prosimy spróbować ponownie.",
              },
            });
          const [klient] = await prisma.$transaction([
            prisma.klienci.create({
              data: {
                ProcentRabatu: 0,
                IdUzytkownicy: uzytkownik.IdUzytkownicy,
                IdLokalizacje: parseInt(Lokalizacja),
              },
            }),
            prisma.role_uzytkownik.create({
              data: {
                IdUzytkownicy: uzytkownik.IdUzytkownicy,
                IdRole: role_uzytkownik.IdRole,
              },
            }),
          ]);
          return res.status(200).json({ data: { klient } });
        }
      } else {
        const pracownikByEmail = await prisma.pracownicy.findFirst({
          where: {
            uzytkownicy: {
              Email,
            },
          },
        });
        if (pracownikByEmail) {
          return res.status(400).json({
            data: "Pracownik z podanym adresem email istnieje. \nPodaj inny adres email.",
          });
        }
        const pracownikByLogin = await prisma.pracownicy.findFirst({
          where: {
            uzytkownicy: {
              Login,
            },
          },
        });
        if (pracownikByLogin) {
          return res.status(400).json({
            data: "Pracownik z podanym loginem istnieje. \nPodaj inny login.",
          });
        }
        const {
          Nazwisko,
          NumerTelefonu,
          Pesel,
          Rola,
          NumerDowodu,
          NumerPrawaJazdy,
        } = rest;
        const [uzytkownik, role_uzytkownik] = await prisma.$transaction([
          prisma.uzytkownicy.create({
            data: {
              Imie: Imię,
              Login,
              Haslo: Hasło,
              Email,
              Aktywny: true,
              Nazwisko,
              NumerTelefonu,
              Pesel,
              NumerDowodu,
              NumerPrawaJazdy,
            },
          }),
          prisma.role_uzytkownik.findFirst({
            where: {
              role: {
                Nazwa: role,
              },
            },
          }),
        ]);
        if (!uzytkownik || !role_uzytkownik) {
          return res.status(500).json({
            data: {
              error: "Wewnętrzny błąd serwera, prosimy spróbować ponownie.",
            },
          });
        }
        const [pracownik] = await prisma.$transaction([
          prisma.pracownicy.create({
            data: {
              IdUzytkownicy: uzytkownik.IdUzytkownicy,
              IdStanowiska: parseInt(Rola),
            },
          }),
          prisma.role_uzytkownik.create({
            data: {
              IdUzytkownicy: uzytkownik.IdUzytkownicy,
              IdRole: role_uzytkownik.IdRole,
            },
          }),
        ]);
        return res.status(200).json({ data: { pracownik } });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
