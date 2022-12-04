import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CarPageProps } from "templates/common/car/types/car.props";
import { NextPageWithLayout } from "types/next";
import { UserRole } from "types/userrole/userrole.type";
import RentSection from "./components/rentsection";

export const RentPage: NextPageWithLayout<CarPageProps> = ({ car }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const role: UserRole | undefined = session?.user.role;
  useEffect(() => {
    if (role !== "KLIENT") {
      router.push("/login");
    }
  }, [role, router]);
  return (
    <>
      <Head>
        <title>Wypożycz auto</title>
      </Head>
      <RentSection car={car} />
    </>
  );
};

RentPage.getLayout = WithoutFooterLayout;

export default RentPage;
