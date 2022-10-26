import { FC } from "react";
import { Article } from "ui";
import styles from "./contactarticle.module.scss";

const ContactArticle: FC = () => (
  <Article
  className={styles.servicesArticle}
  titleProps={{ title: `najlepszy serwis` }}
  paragraphProps={{
    paragraphText:
      "Próbujemy rozwiązać problemy ludzi, którzy nie chcą lub nie mogą posiadać samochodów \ni używają go tylko przez chwilę.",
    as: "p",
  }}
/>
  <Article
    className={styles.contactArticle}
    titleProps={{ title: "Pozostańmy w kontakcie", as: "h2" }}
  />
);

export default ContactArticle;
