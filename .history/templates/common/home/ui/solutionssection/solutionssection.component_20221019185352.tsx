import { FC } from "react";
import { SolutionsArticle, SolutionsCardRow } from "./ui";
import styles from "./solutionssection.module.scss";

const SolutionsSection: FC = () => (
  <section className={styles.solutionsSection}>
    <SolutionsArticle />
    <SolutionsCardRow />
  </section>
);

export default SolutionsSection;
