import { Article } from "../../../../../../../common";
import styles from "./solutionsarticle.module.css";

const SolutionsArticle = () => (
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
