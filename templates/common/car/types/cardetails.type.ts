import {
  samochody,
  samochodyszczegoly,
  uslugi,
  wypozyczenia,
} from "@prisma/client";

export type CarDetails =
  | (samochody & {
      samochodyszczegoly: samochodyszczegoly;
      uslugi: (uslugi & {
        wypozyczenia: wypozyczenia[];
      })[];
    })
  | null;
