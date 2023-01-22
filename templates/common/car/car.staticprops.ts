import { prisma } from "db";
import { GetStaticProps } from "next/types";
import { CarPageProps } from "templates/common/car/types/car.props";
import { Params } from "types/params/params.type";

export const carPageStaticProps: GetStaticProps<CarPageProps, Params> = async (
  context
) => {
  const { id } = context.params!;
  const car = await prisma.samochody.findFirst({
    where: {
      IdSamochody: parseInt(id),
    },
    include: {
      uslugi: {
        include: {
          wypozyczenia: true,
        },
      },
      samochodyszczegoly: true,
    },
  });
  const additionalRentOptions = await prisma.dodatkoweopcje.findMany();
  return {
    props: {
      car: car
        ? { ...JSON.parse(JSON.stringify(car!)), OstatniaAktualizacja: null }
        : null,
      additionalRentOptions: JSON.parse(JSON.stringify(additionalRentOptions)),
    },
  };
};
