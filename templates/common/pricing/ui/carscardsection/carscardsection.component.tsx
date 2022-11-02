import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import styles from "./carscardsection.module.scss";
import CarsTable from "./carstable/carstable.component";
import LendArticle from "./lendarticle/lendarticle.component";

const CarsCardSection: FC = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.carsCardSection}
      style={{ height: open ? "100vh" : "85vh" }}
    >
      <div className={styles.carsCardSectionContainer}>
        <LendArticle />
        <CarsTable />
      </div>
    </section>
  );
};

export default CarsCardSection;
