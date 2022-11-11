import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      RodzajPaliwa,
      Nadwozie,
      PojemnoscBagaznika,
      IloscDrzwi,
      IloscMiejsc,
      CzyUmyty,
      CzyUszkodzony,
      Przebieg,
      Marka,
      Model,
      NumerVIN,
      NumerRejestracyjny,
      ...rest
    } = req.body;
    const [samochod] = await prisma.$transaction([
      prisma.samochody.create({
        data: {
          ...rest,
          Marka: Marka.toUpperCase(),
          Model: Model.toUpperCase(),
          NumerVIN: NumerVIN.toUpperCase(),
          NumerRejestracyjny: NumerRejestracyjny.toUpperCase(),
          CzyUmyty: CzyUmyty === "TAK" ? true : false,
          CzyUszkodzony: CzyUszkodzony === "TAK" ? true : false,
          Przebieg: Przebieg.toString(),
          samochodyszczegoly: {
            create: {
              RodzajPaliwa,
              Nadwozie,
              PojemnoscBagaznika,
              IloscDrzwi,
              IloscMiejsc,
            },
          },
        },
      }),
    ]);
    return res.status(200).json({ data: { samochod } });
  } else if (req.method === "DELETE") {
    try {
      const carByIdSamochody = await prisma.samochody.findFirst({
        where: { IdSamochody: req.body["0"].IdSamochody },
      });
      if (!carByIdSamochody) {
        return res.status(400).json({ data: "Nie odnaleziono samochodu" });
      }
      const [user] = await prisma.$transaction([
        prisma.samochody.delete({
          where: { IdSamochody: req.body["0"].IdSamochody },
          include: {
            samochodyszczegoly: true,
            uslugi: true,
          },
        }),
      ]);
      return res.status(200).json({ data: { user } });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "PUT") {
    const {
      RodzajPaliwa,
      Nadwozie,
      PojemnoscBagaznika,
      IloscDrzwi,
      IloscMiejsc,
      CzyUmyty,
      CzyUszkodzony,
      Przebieg,
      Marka,
      Model,
      NumerVIN,
      NumerRejestracyjny,
      CenaZaGodzine,
      Kategoria,
    } = req.body;
    try {
      const carByIdSamochody = await prisma.samochody.findFirst({
        where: { IdSamochody: req.body.IdSamochody },
      });
      if (!carByIdSamochody) {
        return res.status(400).json({ data: "Nie odnaleziono samochodu" });
      }
      const [samochod] = await prisma.$transaction([
        prisma.samochody.update({
          data: {
            // ...rest,
            Marka: Marka.toUpperCase(),
            Model: Model.toUpperCase(),
            NumerVIN: NumerVIN.toUpperCase(),
            NumerRejestracyjny: NumerRejestracyjny.toUpperCase(),
            CzyUmyty: CzyUmyty === "TAK" ? true : false,
            CzyUszkodzony: CzyUszkodzony === "TAK" ? true : false,
            Przebieg: Przebieg.toString(),
            CenaZaGodzine,
            Kategoria,
            samochodyszczegoly: {
              update: {
                RodzajPaliwa,
                Nadwozie,
                PojemnoscBagaznika,
                IloscDrzwi,
                IloscMiejsc,
              },
            },
          },
          where: {
            IdSamochody: carByIdSamochody.IdSamochody,
          },
        }),
      ]);
      return res.status(200).json({ data: { samochod } });
    } catch (err) {
      console.log(err);
    }
  }
}
