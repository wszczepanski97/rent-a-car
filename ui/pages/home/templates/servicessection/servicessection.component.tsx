import { ServicesArticle, ServicesPromo } from "./ui";
import styles from "./servicessection.module.scss";

const ServicesSection = () => (
  <section className={styles.servicesSection}>
    <ServicesArticle />
    <ServicesPromo />
  </section>
);

export default ServicesSection;
