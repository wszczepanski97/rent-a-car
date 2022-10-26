import { FC } from "react";
import styles from "./statssection.module.scss";
import { StatsArticle, StatsCardRow } from "./ui";

const StatsSection: FC = () => (
  <section className={styles.statsSection} id="stats-section">
    <StatsArticle />
    <StatsCardRow />
  </section>
);

export default StatsSection;
