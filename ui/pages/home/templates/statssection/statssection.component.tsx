import { FC } from "react";
import { StatsCardRow, StatsArticle } from "./ui";
import styles from "./statssection.module.scss";

const StatsSection: FC = () => (
  <section className={styles.statsSection}>
    <StatsArticle />
    <StatsCardRow />
  </section>
);

export default StatsSection;
