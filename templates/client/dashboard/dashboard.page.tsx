import type { NextPage } from "next";
import type { DashboardPageProps } from "templates/client/dashboard/dashboard.props";
import DashboardSection from "./components/dashboardsection";
import { DashboardPageContext } from "./context/dashboard.context";

const DashboardPage: NextPage<DashboardPageProps> = ({ cars }) => (
  <DashboardPageContext.Provider value={cars}>
    <DashboardSection />
  </DashboardPageContext.Provider>
);

export default DashboardPage;
