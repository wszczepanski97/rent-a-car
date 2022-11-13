import { prisma } from "db";
import { GetStaticPaths } from "next/types";
import { Params } from "types/params/params.type";

export const carPageStaticPaths: GetStaticPaths<Params> = async () => {
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
