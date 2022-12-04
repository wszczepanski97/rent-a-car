import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import type { DashboardPageProps } from "templates/client/dashboard/dashboard.props";
import { NextPageWithLayout } from "types/next";
import DashboardSection from "./components/dashboardsection";
import { DashboardPageContext } from "./context/dashboard.context";

const DashboardPage: NextPageWithLayout<DashboardPageProps> = ({ cars }) => (
  <>
    <Head>
      <title>Panel główny</title>
    </Head>
    <DashboardPageContext.Provider value={cars}>
      <DashboardSection />
    </DashboardPageContext.Provider>
  </>
);

DashboardPage.getLayout = WithoutFooterLayout;

export default DashboardPage;
