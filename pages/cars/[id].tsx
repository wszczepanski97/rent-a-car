import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { CarDetailsSection, CarProps, Params } from "templates/car";
import { prisma } from "../../db";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
        include: {
          wypozyczenia: {
            where: {
              IdWypozyczeniaStatus: 4,
            },
          },
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
  const carIds = await prisma.samochody.findMany({
    select: {
      IdSamochody: true,
    },
  });

  const paths = carIds.map((carId) => ({
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
