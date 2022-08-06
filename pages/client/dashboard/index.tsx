import type { GetStaticProps } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { prisma } from "../../../db";

const getCars: GetStaticProps = async () => {
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

export const getStaticProps = getCars;

export { default } from "templates/client/dashboard";
