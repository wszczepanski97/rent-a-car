import { DashboardCarousel, DashboardHeader } from "./ui";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./dashboardsection.module.scss";

const DashboardSection = () => (
  <section id="carsCardSection" className={styles.carsCardSection}>
    <DashboardHeader />
    <DashboardCarousel />
  </section>
);

export default DashboardSection;
