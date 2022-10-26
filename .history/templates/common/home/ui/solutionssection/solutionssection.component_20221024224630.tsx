import { FC } from "react";
import styles from "./solutionssection.module.scss";
import { SolutionsArticle, SolutionsCardRow } from "./ui";

const SolutionsSection: FC = () => (
  <section className={styles.solutionsSection} id="Praktyczne porady">
    <SolutionsArticle />
    <SolutionsCardRow />
  </section>
);

export default SolutionsSection;
