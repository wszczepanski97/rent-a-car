import { StatsCardRow, StatsArticle } from "./ui";
import styles from "./statssection.module.css";

const StatsSection = () => (
  <section className={styles.statsSection}>
    <StatsArticle />
    <StatsCardRow />
  </section>
);

export default StatsSection;
