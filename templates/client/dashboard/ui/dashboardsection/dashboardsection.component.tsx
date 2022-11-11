import "react-responsive-carousel/lib/styles/carousel.min.css";
import DashboardCarousel from "templates/client/dashboard/ui/dashboardsection/ui/dashboardcarousel/dashboardcarousel.component";
import DashboardHeader from "templates/client/dashboard/ui/dashboardsection/ui/dashboardheader/dashboardheader.component";
import styles from "./dashboardsection.module.scss";

const DashboardSection = () => (
  <section id="carsCardSection" className={styles.carsCardSection}>
    <DashboardHeader />
    <DashboardCarousel />
  </section>
);

export default DashboardSection;
