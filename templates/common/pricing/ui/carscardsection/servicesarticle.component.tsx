import { Article } from "ui";
import styles from "./servicesarticle.module.scss";

const ServicesArticle = () => (
  <Article
    className={styles.servicesArticle}
    titleProps={{
      title: `Zapewniamy najlepszy serwis`,
      lowerCase: true,
      as: "h2",
    }}
    paragraphProps={{
      paragraphText:
        "Próbujemy rozwiązać problemy ludzi, którzy nie chcą lub nie mogą posiadać samochodów \nand use it only for a while.",
      as: "p",
    }}
  />
);

export default ServicesArticle;
