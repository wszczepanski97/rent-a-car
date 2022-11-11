import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import PaychecksCardTitle from "./components/paycheckscardtitle";
import PaychecksTable from "./components/paycheckstable";
import styles from "./paychecksection.module.scss";

const PaycheckSection: FC = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={styles.paychecksSection}
      style={{ height: open ? "100vh" : "85vh" }}
    >
      <Card type={CardType.CUSTOM} className={styles.paychecksCard}>
        <PaychecksCardTitle />
        <PaychecksTable />
      </Card>
    </section>
  );
};

export default PaycheckSection;
