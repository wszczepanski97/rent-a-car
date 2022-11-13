import DashboardCarousel from "./components/dashboardcarousel";
import DashboardHeader from "./components/dashboardheader";
import styles from "./dashboardsection.module.scss";

const DashboardSection = () => (
  <section id="dashboardSection" className={styles.dashboardSection}>
    <DashboardHeader />
    <DashboardCarousel />
  </section>
);

export default DashboardSection;
