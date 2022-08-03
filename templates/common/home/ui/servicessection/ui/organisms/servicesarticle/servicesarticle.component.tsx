import { Article } from "ui";
import styles from "./servicesarticle.module.scss";

const ServicesArticle = () => (
  <Article
    className={styles.servicesArticle}
    titleProps={{ title: `najlepszy serwis` }}
    paragraphProps={{
      paragraphText:
        "Próbujemy rozwiązać problemy ludzi, którzy nie chcą lub nie mogą posiadać samochodów \ni używają go tylko przez chwilę.",
      as: "p",
    }}
  />
);

export default ServicesArticle;
