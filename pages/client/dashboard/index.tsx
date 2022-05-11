import type { GetStaticProps, NextPage } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { prisma } from "../../../db";
import { DashboardCarousel } from "templates/client/dashboard/ui";
import DashboardHeader from "templates/client/dashboard/ui/dashboardheader/dashboardheader.component";
import { DashboardPageProps } from "templates/common/home/types";

const DashboardPage: NextPage<DashboardPageProps> = ({ cars }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    }}
  >
    <DashboardHeader />
    <DashboardCarousel cars={cars} />
  </div>
);

const getCars: GetStaticProps = async () => {
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

export default DashboardPage;
