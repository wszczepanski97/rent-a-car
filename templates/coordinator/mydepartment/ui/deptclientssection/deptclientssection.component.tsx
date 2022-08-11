import { FC } from "react";
import { DeptClientsSectionTable } from "./organisms";
import styles from "./deptclientssection.module.scss";
import { Article } from "ui";

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
