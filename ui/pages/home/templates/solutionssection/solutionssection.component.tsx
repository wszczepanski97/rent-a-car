import { SolutionsArticle, SolutionsCardRow } from "./ui";
import styles from "./solutionssection.module.css";

const SolutionsSection = () => (
  <section className={styles.solutionsSection}>
    <SolutionsArticle />
    <SolutionsCardRow />
  </section>
);

export default SolutionsSection;
