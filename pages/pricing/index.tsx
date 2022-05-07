import { GetStaticProps, NextPage } from "next";
import {
  Cars,
  CarsCardSection,
  LendSection,
  PricingPageProps,
} from "templates/common";
import { ContactSection } from "ui/common";
import { prisma } from "../../db";

const PricingPage: NextPage<PricingPageProps> = ({ cars }) => {
  console.log(cars);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <LendSection />
      <CarsCardSection cars={cars} />
      <ContactSection />
    </div>
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
