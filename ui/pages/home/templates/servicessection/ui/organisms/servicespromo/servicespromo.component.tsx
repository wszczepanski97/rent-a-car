import { FC } from "react";
import { OfficePhoto, ServicesPromoDescription } from "./molecules";
import styles from "./servicespromo.module.scss";

const ServicesPromo: FC = () => (
  <div className={styles.servicesPromo}>
    <OfficePhoto />
    <ServicesPromoDescription />
  </div>
);

export default ServicesPromo;
