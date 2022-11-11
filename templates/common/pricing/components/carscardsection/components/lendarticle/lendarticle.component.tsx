import Article from "ui/molecules/article";
import styles from "./lendarticle.module.scss";

const LendArticle = () => (
  <Article
    className={styles.lendArticle}
    titleProps={{
      title: `Wybierz auto do wypożyczenia`,
      lowerCase: true,
      as: "h2",
    }}
    paragraphProps={{
      paragraphText: `Chcemy dać Ci najlepsze doświadczenie jakie tylko możemy.\n Sprawdź wycenę naszych aut by znaleźć najlepsze auto do spełnienia swoich potrzeb. `,
      as: "p",
    }}
  />
);

export default LendArticle;
