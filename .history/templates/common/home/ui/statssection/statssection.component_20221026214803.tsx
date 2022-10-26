import { FC } from "react";
import { ContactSection } from "ui";
import styles from "./statssection.module.scss";
import { StatsArticle, StatsCardRow } from "./ui";

const StatsSection: FC = () => (
  <section className={styles.statsSection} id="Dlaczego my?">
    <StatsArticle />
    <StatsCardRow />
    <ContactSection />
  </section>
);

export default StatsSection;
