import styles from "./servicessection.module.scss";
import { ServicesArticle, ServicesPromo } from "./ui";

const ServicesSection = () => (
  <section className={styles.servicesSection} id="services-section">
    <ServicesArticle />
    <ServicesPromo />
  </section>
);

export default ServicesSection;
