import { FC } from "react";
import LendArticle from "./lendarticle/lendarticle.component";
import CarsTable from "./carstable/carstable.component";
import styles from "./carscardsection.module.scss";

const CarsCardSection: FC = () => (
  <section id="carsCardSection" className={styles.carsCardSection}>
    <LendArticle />
    <CarsTable />
  </section>
);

export default CarsCardSection;
