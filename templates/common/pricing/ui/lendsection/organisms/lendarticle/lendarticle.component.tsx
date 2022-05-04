import { Article } from "ui";
import styles from "./lendarticle.module.scss";

const LendArticle = () => (
  <Article
    className={styles.lendArticle}
    titleProps={{
      title: `Choose a car to lend `,
      lowerCase: true,
      as: "h2",
    }}
    paragraphProps={{
      paragraphText: `We want to provide to you the best performance.\nPlease check out pricing to look out for the best car. `,
      as: "p",
    }}
  />
);

export default LendArticle;
