import type { FC } from "react";
import ContactSection from "ui/templates/contactsection";
import StatsArticle from "./components/statsarticle";
import StatsCardRow from "./components/statscardrow";
import styles from "./statssection.module.scss";

const StatsSection: FC = () => (
  <section className={styles.statsSection} id="Dlaczego my?">
    <StatsArticle />
    <StatsCardRow />
    <ContactSection />
  </section>
);

export default StatsSection;
