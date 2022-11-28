import { prisma } from "db";
import { GetServerSideProps } from "next/types";
import { RegisterPageProps } from "templates/common/register/register.props";

export const registerServerSideProps: GetServerSideProps<
  RegisterPageProps
> = async () => {
  const allLocations = await prisma.lokalizacje.findMany();
  const allJobRoles = await prisma.role.findMany();
  return {
    props: { allLocations, allJobRoles },
  };
};
