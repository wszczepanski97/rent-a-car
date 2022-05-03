import { GetStaticProps, NextPage } from "next";
import {
  Cars,
  CarsCardSection,
  LendSection,
  PricingPageProps,
} from "templates/pricing";
import { ContactSection } from "ui/common";
import { prisma } from "../../db";

const PricingPage: NextPage<PricingPageProps> = ({ cars }) => {
  return (
    <>
      <LendSection />
      <CarsCardSection cars={cars} />
      <ContactSection />
    </>
  );
};

const getCars: GetStaticProps<{
  cars: Cars[];
}> = async () => {
  const cars = (
    await prisma.samochody.findMany({
      include: {
        samochodyszczegoly: true,
      },
    })
  ).map(
    ({
      CenaZaDzien,
      IdSamochody,
      Marka,
      Model,
      Zdjecia,
      samochodyszczegoly: { IdSamochodySzczegoly, ...samochodyszczegolyrest },
    }) => ({
      CenaZaDzien,
      IdSamochody,
      Marka,
      Model,
      Zdjecia,
      ...samochodyszczegolyrest,
    })
  );
  return {
    props: { cars },
  };
};

export const getStaticProps = getCars;

export default PricingPage;
