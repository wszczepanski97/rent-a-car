import { FC } from "react";
import { Article } from "ui";
import styles from "./solutionsarticle.module.scss";

const SolutionsArticle: FC = () => (
  <Article
    className={styles.solutionsArticle}
    titleProps={{ title: "Practice Advice" }}
    paragraphProps={{
      paragraphText:
        "Problems trying to resolve between people who don’t want to own cars and use it only for a while.",
      as: "p",
    }}
  />
);

export default SolutionsArticle;
