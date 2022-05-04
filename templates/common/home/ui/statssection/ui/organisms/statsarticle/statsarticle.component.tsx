import { FC } from "react";
import { Article } from "ui";
import styles from "./statsarticle.module.scss";

const StatsArticle: FC = () => (
  <Article
    className={styles.statsArticle}
    titleProps={{ title: "Why choose us" }}
    paragraphProps={{
      paragraphText:
        "Problems trying to resolve between people who don’t want to own cars \nand use it only for a while.",
      as: "p",
    }}
  />
);

export default StatsArticle;
