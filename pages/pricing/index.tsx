import { GetStaticProps, NextPage } from "next";
import { CarsPageProps } from "templates";
import { CarsCardSection, LendSection } from "templates/common";
import { ContactSection } from "ui/common";
import { prisma } from "../../db";

const PricingPage: NextPage<CarsPageProps> = ({ cars }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <LendSection />
    <CarsCardSection cars={cars} />
    <ContactSection />
  </div>
);

const getCars: GetStaticProps<CarsPageProps> = async () => {
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

export default PricingPage;
