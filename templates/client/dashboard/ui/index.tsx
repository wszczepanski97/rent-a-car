import type { NextPage } from "next";
import { Car } from "types/car/car.type";
import { DashboardPageContext } from "../contexts";
import DashboardSection from "./dashboardsection/dashboardsection.component";

type DashboardPageProps = {
  cars: Car[];
};

const DashboardPage: NextPage<DashboardPageProps> = ({ cars }) => (
  <DashboardPageContext.Provider value={cars}>
    <DashboardSection />
  </DashboardPageContext.Provider>
);

export default DashboardPage;
