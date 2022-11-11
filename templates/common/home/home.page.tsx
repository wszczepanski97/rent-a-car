import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    if (session?.user.role === UserRole.CLIENT) {
      router.replace(`/${session?.user.role.toLowerCase()}/dashboard`);
    } else if (session?.user.role === UserRole.COORDINATOR) {
      router.replace("/coordinator/dashboard");
    } else if (session?.user.role === UserRole.CLEANER) {
      router.replace("/cleaner/dashboard");
    } else if (session?.user.role === UserRole.DRIVER) {
      router.replace("/driver/dashboard");
    } else if (session?.user.role === UserRole.MECHANIC) {
      router.replace("/mechanic/dashboard");
    }
  }, [session, router]);

  return (
    <>
      <HeaderSection />
      <ServicesSection />
      <StatsSection />
      <SolutionsSection />
    </>
  );
};

export default HomePage;
