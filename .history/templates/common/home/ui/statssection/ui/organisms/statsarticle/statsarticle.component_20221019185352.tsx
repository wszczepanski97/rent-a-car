import { FC } from "react";
import { Article } from "ui";
import styles from "./statsarticle.module.scss";

const StatsArticle: FC = () => (
  <Article
    className={styles.statsArticle}
    titleProps={{ title: "DLACZEGO MY" }}
    paragraphProps={{
      paragraphText:
        "Próbujemy rozwiązać problemy ludzi, którzy nie chcą lub nie mogą posiadać samochodów \ni używają go tylko przez chwilę.",
      as: "p",
    }}
  />
);

export default StatsArticle;
