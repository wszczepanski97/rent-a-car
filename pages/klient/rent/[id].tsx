import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { CarProps, Params } from "templates/klient";
import { UserRole } from "templates/common";
import { RentSection } from "templates/klient";
import { prisma } from "../../../db";

const RentPage: NextPage<CarProps> = ({ car }) => {
  const { data: session } = useSession();
  const role: UserRole | undefined = session ? session.user.role : undefined;
  return role === "KLIENT" ? (
    <RentSection car={car} />
  ) : (
    <div>To nie klient</div>
  );
};

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
export default RentPage;
