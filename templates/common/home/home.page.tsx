import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeaderSection from "templates/common/home/components/headersection/headersection.component";
import { NextPageWithLayout } from "types/next";
import { UserRole } from "types/userrole/userrole.type";
import ServicesSection from "./components/servicessection";
import SolutionsSection from "./components/solutionssection";
import StatsSection from "./components/statssection";

const HomePage: NextPageWithLayout<{}> = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.role) {
      router.replace(
        `/${Object.keys(UserRole)[
          Object.values(UserRole).indexOf(session?.user.role)
        ].toLowerCase()}/dashboard`
      );
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>Wypożyczalnia - Rent a car</title>
      </Head>
      <HeaderSection />
      <ServicesSection />
      <StatsSection />
      <SolutionsSection />
    </>
  );
};

export default HomePage;
