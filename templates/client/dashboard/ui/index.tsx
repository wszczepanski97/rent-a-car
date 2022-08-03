import type { NextPage } from "next";
import { Cars } from "templates/common/types";
import { DashboardPageContext } from "../contexts";
import DashboardSection from "./dashboardsection/dashboardsection.component";

type DashboardPageProps = {
  cars: Cars[];
};

const DashboardPage: NextPage<DashboardPageProps> = ({ cars }) => (
  <DashboardPageContext.Provider value={cars}>
    <DashboardSection />
  </DashboardPageContext.Provider>
);

export default DashboardPage;
