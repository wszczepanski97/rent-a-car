import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarProps, Params } from "templates/client/car/types";
import CarDetailsSection from "templates/client/car/ui/cardetailssection/cardetailssection.component";
import { prisma } from "../../db";

const CarPage: NextPage<CarProps> = ({ car }) => (
  <CarDetailsSection car={car} />
);

const getCar: GetStaticProps<CarProps, Params> = async (context) => {
  const { id } = context.params!;
  const car = await prisma.samochody.findFirst({
    where: {
      IdSamochody: parseInt(id),
    },
    include: {
      uslugi: {
        where: {
          IdUslugaStatus: 3,
        },
        include: {
          wypozyczenia: true,
        },
      },
      samochodyszczegoly: true,
    },
  });
  return {
    props: {
      car: { ...car!, OstatniaAktualizacja: null },
    },
  };
};

const getCarPaths: GetStaticPaths<Params> = async () => {
  const paths = (
    await prisma.samochody.findMany({
      select: {
        IdSamochody: true,
      },
    })
  ).map((carId) => ({
    params: { id: String(carId.IdSamochody) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = getCar;
export const getStaticPaths = getCarPaths;
export default CarPage;
