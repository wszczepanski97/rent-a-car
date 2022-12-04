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