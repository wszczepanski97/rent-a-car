import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import styles from "./carscardsection.module.scss";
import CarsTable from "./components/carstable/carstable.component";
import LendArticle from "./components/lendarticle/lendarticle.component";

const CarsCardSection: FC = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.carsCardSection}
      style={{ height: open ? "100vh" : "85vh", paddingTop: open ? 50 : 0 }}
    >
      <div className={styles.carsCardSectionContainer}>
        <LendArticle />
        <CarsTable />
      </div>
    </section>
  );
};

export default CarsCardSection;
