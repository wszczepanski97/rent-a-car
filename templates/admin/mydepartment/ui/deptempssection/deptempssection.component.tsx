import { FC } from "react";
import { DeptEmpsSectionTable } from "./organisms";
import styles from "./deptempssection.module.scss";
import { Article } from "ui";

const DeptEmpsSection: FC = () => (
  <section
    id="deptEmpsSection"
    data-carousel="Pracownicy"
    className={styles.deptEmpsSection}
  >
    <Article
      className={styles.lendArticle}
      titleProps={{
        title: `Przeglądaj dane pracowników`,
        lowerCase: true,
        as: "h2",
      }}
      paragraphProps={{
        paragraphText: `Poniżej znajduje się tabela w której możesz dokonywać dowolne akcje`,
        as: "p",
      }}
    />
    <DeptEmpsSectionTable />
  </section>
);

export default DeptEmpsSection;
