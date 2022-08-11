import { FC } from "react";
import { DeptCarsSectionTable } from "./organisms";
import styles from "./deptcarssection.module.scss";
import { Article } from "ui";

const DeptCarsSection: FC = () => (
  <section
    id="deptCarsSection"
    data-carousel="Samochody"
    className={styles.deptCarsSection}
  >
    <Article
      className={styles.infoArticle}
      titleProps={{
        title: `Przeglądaj dane samochodów`,
        lowerCase: true,
        as: "h2",
      }}
      paragraphProps={{
        paragraphText: `Poniżej znajduje się tabela w której możesz dokonywać dowolne akcje`,
        as: "p",
      }}
    />
    <DeptCarsSectionTable />
  </section>
);

export default DeptCarsSection;
