import { GetStaticProps } from "next";
import { Cars } from "templates/common/types";
import { prisma } from "../../db";

export const getStaticProps: GetStaticProps<{ cars: Cars[] }> = async () => {
  const cars = await prisma.samochody.findMany({
    include: {
      samochodyszczegoly: true,
    },
  });
  cars.map(
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

export { default } from "templates/common/pricing";
