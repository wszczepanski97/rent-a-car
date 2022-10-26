import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Header,
  ServicesSection,
  SolutionsSection,
  StatsSection,
  UserRole,
} from "templates/common";
import { ContactSection } from "ui/common";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user.role === UserRole.CLIENT) {
      router.replace("/client/dashboard");
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
      <Header />
      <SolutionsSection />
      <StatsSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
