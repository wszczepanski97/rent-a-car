import { pracownicy } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { DeptEmpsSection } from "templates/admin/mydepartment/ui";
import { prisma } from "../../../db";

export type MyDepartmentAdminPageProps = {
  deptEmps: pracownicy[] | null;
};

const MyDepartmentAdminPage: NextPage<MyDepartmentAdminPageProps> = ({
  deptEmps,
}) => {
  console.log(deptEmps);
  return <DeptEmpsSection deptEmps={deptEmps} />;
};

const getDeptEmps: GetServerSideProps<MyDepartmentAdminPageProps> = async (
  context
) => {
  const session = await getSession(context);
  const admin = await prisma.pracownicy.findFirst({
    where: {
      IdUzytkownicy: session?.user.id,
    },
  });
  if (!admin) {
    return {
      props: { deptEmps: null },
    };
  } else {
    const dept = await prisma.oddzialy_hist.findFirst({
      where: {
        IdPracownicy: admin.IdPracownicy,
        NOT: [
          {
            DoKiedy: null,
          },
        ],
      },
    });
    if (!dept) {
      return {
        props: { deptEmps: null },
      };
    } else {
      const deptEmpsArray = await prisma.oddzialy_hist.findMany({
        where: {
          IdOddzialy: dept.IdOddzialy,
          NOT: [
            {
              DoKiedy: null,
            },
          ],
        },
        select: {
          pracownicy: {
            include: {
              lokalizacje: {
                select: {
                  IdLokalizacje: true,
                },
              },
              stanowiska: true,
              uzytkownicy: true,
            },
          },
        },
      });
      const deptEmps = [
        ...deptEmpsArray.map((deptEmp) => ({
          ...deptEmp.pracownicy,
          ...deptEmp.pracownicy.uzytkownicy,
          lokalizacje: deptEmp.pracownicy.lokalizacje.IdLokalizacje,
          stanowiska: deptEmp.pracownicy.stanowiska.Nazwa,
        })),
      ];
      return {
        props: { deptEmps },
      };
    }
  }
};

export const getServerSideProps = getDeptEmps;

export default MyDepartmentAdminPage;
