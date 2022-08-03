import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { CarProps, Params } from "templates/client";
import { UserRole } from "templates/common";
import { RentSection } from "templates/client";
import { prisma } from "../../../db";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RentPage: NextPage<CarProps> = ({ car }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const role: UserRole | undefined = session?.user.role;
  useEffect(() => {
    if (role !== "KLIENT") {
      router.push("/login?role=client");
    }
  }, [role]);
  return <RentSection car={car} />;
};

const getCar: GetStaticProps<CarProps, Params> = async (context) => {
  const { id } = context.params!;
  const car = await prisma.samochody.findFirst({
    where: {
      IdSamochody: parseInt(id),
    },
    include: {
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
