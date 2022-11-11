import ServicesArticle from "./components/servicesarticle";
import ServicesPromo from "./components/servicespromo";
import styles from "./servicessection.module.scss";

const ServicesSection = () => (
  <section className={styles.servicesSection} id="Najlepszy serwis">
    <ServicesArticle />
    <ServicesPromo />
  </section>
);

export default ServicesSection;
