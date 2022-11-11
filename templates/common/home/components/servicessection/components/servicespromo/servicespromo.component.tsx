import type { FC } from "react";
import OfficePhoto from "./components/officephoto";
import ServicesPromoDescription from "./components/servicespromodescription";
import styles from "./servicespromo.module.scss";

const ServicesPromo: FC = () => (
  <div className={styles.servicesPromo}>
    <OfficePhoto />
    <ServicesPromoDescription />
  </div>
);

export default ServicesPromo;
