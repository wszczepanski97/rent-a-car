import type { FC } from "react";
import Article from "ui/molecules/article";
import styles from "./solutionsarticle.module.scss";

const SolutionsArticle: FC = () => (
  <Article
    className={styles.solutionsArticle}
    titleProps={{ title: "PRAKTYCZNE PORADY" }}
    paragraphProps={{
      paragraphText:
        "Próbujemy rozwiązać problemy ludzi, którzy nie chcą lub nie mogą posiadać samochodów \ni używają go tylko przez chwilę.",
      as: "p",
    }}
  />
);

export default SolutionsArticle;
