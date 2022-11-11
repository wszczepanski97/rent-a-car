import type { FC } from "react";
import SolutionsArticle from "./components/solutionsarticle";
import SolutionsCardRow from "./components/solutionscardrow";
import styles from "./solutionssection.module.scss";

const SolutionsSection: FC = () => (
  <section className={styles.solutionsSection} id="Praktyczne porady">
    <SolutionsArticle />
    <SolutionsCardRow />
  </section>
);

export default SolutionsSection;
