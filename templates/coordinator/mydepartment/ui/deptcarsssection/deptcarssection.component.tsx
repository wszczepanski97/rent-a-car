import type { FC } from "react";
import DeptCarsSectionTable from "templates/coordinator/mydepartment/ui/deptcarsssection/organisms/deptcarssectiontable/deptcarssectiontable.component";
import Article from "ui/molecules/article";
import styles from "./deptcarssection.module.scss";

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
