import { FullScreenContext } from "contexts/full-screen.context";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useContext } from "react";
import { SWRConfig } from "swr";
import ServicesGrid from "templates/driver/dashboard/components/servicesgrid/servicesgrid.component";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import { ServicesContextProvider } from "./context/dashboard.context";
import { DashboardLayout } from "./dashboard.layout";
import { DashboardPageProps } from "./dashboard.props";

const DashboardPage: NextPageWithLayout<DashboardPageProps> = ({
  services: initialServices,
}) => {
  const {
    screen: { active },
  } = useContext(FullScreenContext);
  const { data: session } = useSession();
  return (
    <SWRConfig
      value={{
        refreshInterval: 180000,
      }}
    >
      <Head>
        <title>Panel główny - kierowca</title>
      </Head>
      <ServicesContextProvider
        services={initialServices}
        sessionId={session?.user.id}
      >
        {active && <Navbar />}
        <ServicesGrid />
      </ServicesContextProvider>
    </SWRConfig>
  );
};

DashboardPage.getLayout = DashboardLayout;

export default DashboardPage;
