import { FullScreenContext } from "contexts/full-screen.context";
import { SidebarContext } from "contexts/sidebar.context";
import { useContext } from "react";
import DashboardCarousel from "./components/dashboardcarousel";
import DashboardHeader from "./components/dashboardheader";
import styles from "./dashboardsection.module.scss";

const DashboardSection = () => {
  const {
    screen: { active },
  } = useContext(FullScreenContext);
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.dashboardSection}
      style={{
        gap: active ? 50 : 20,
        justifyContent: open ? "center" : "inherit",
        paddingTop: open ? 50 : 0,
      }}
    >
      <DashboardHeader />
      <DashboardCarousel />
    </section>
  );
};

export default DashboardSection;
