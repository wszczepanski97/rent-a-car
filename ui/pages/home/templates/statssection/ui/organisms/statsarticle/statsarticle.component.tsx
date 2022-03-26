import { Article } from "../../../../../../../common";
import styles from "./statsarticle.module.css";

const StatsArticle = () => (
  <Article
    className={styles.statsArticle}
    titleProps={{ title: "Why choose us" }}
    paragraphProps={{
      paragraphText:
        "Problems trying to resolve between people who don’t want to own cars and use it only for a while.",
      as: "p",
    }}
  />
);

export default StatsArticle;
