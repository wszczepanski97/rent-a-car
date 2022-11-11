import type { FC } from "react";
import DeptClientsSectionTable from "templates/coordinator/mydepartment/ui/deptclientssection/organisms/deptclientssectiontable/deptclientssectiontable.component";
import Article from "ui/molecules/article";
import styles from "./deptclientssection.module.scss";

const DeptClientsSection: FC = () => (
  <section
    id="deptClientsSection"
    data-carousel="Klienci"
    className={styles.deptClientsSection}
  >
    <Article
      className={styles.infoArticle}
      titleProps={{
        title: `Przeglądaj dane klientów`,
        lowerCase: true,
        as: "h2",
      }}
      paragraphProps={{
        paragraphText: `Poniżej znajduje się tabela w której możesz dokonywać dowolne akcje`,
        as: "p",
      }}
    />
    <DeptClientsSectionTable />
  </section>
);

export default DeptClientsSection;
