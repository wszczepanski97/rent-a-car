import { FC } from "react";
import { Article } from "ui";
import styles from "./solutionsarticle.module.scss";

const SolutionsArticle: FC = () => (
  <Article
    className={styles.solutionsArticle}
    titleProps={{ title: "PRAKTYCZNE PORADY" }}
    paragraphProps={{
      paragraphText:
        "Próbujemy rozwiązać problemy ludzi, którzy nie chcą lub nie mogą posiadać samochodów \nand use it only for a while.",
      as: "p",
    }}
  />
);

export default SolutionsArticle;
