import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
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

const HomePage: NextPage<ProfilePageProps> = ({ session }) => {
  const router = useRouter();
  useEffect(() => {
    if (session?.user.role === UserRole.client) {
      router.replace("/client/dashboard");
    }
  }, [session, router]);
  return (
    <>
      <Header />
      <StatsSection />
      <SolutionsSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
};

const getUser: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

export type ProfilePageProps = {
  session: Session | null;
};

export const getServerSideProps = getUser;

export default HomePage;
