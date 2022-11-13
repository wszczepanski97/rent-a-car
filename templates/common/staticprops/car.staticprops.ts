import { prisma } from "db";
import { GetStaticProps } from "next/types";
import { Car } from "types/car/car.type";

export const carStaticProps: GetStaticProps<{ cars: Car[] }> = async () => {
  const cars = (
    await prisma.samochody.findMany({
      include: {
        samochodyszczegoly: true,
      },
    })
  ).map(
    ({
      CenaZaGodzine,
      IdSamochody,
      Marka,
      Model,
      Zdjecia,
      samochodyszczegoly: { IdSamochodySzczegoly, ...samochodyszczegolyrest },
    }) => ({
      CenaZaGodzine,
      IdSamochody,
      Nazwa: `${Marka} ${Model}`,
      Zdjecie: Zdjecia?.split(";")[0] || "",
      ...samochodyszczegolyrest,
    })
  );
  return {
    props: { cars },
  };
};
