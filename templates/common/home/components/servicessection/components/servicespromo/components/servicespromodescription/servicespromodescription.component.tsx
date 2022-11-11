import type { FC } from "react";
import ServicesPromoArticle from "./components/servicespromoarticle";
import ServicesPromoParagraph from "./components/servicespromoparagraph";
import styles from "./servicespromodescription.module.scss";

const ServicesPromoDescription: FC = () => (
  <div className={styles.servicesPromoDescription}>
    <ServicesPromoArticle />
    <ServicesPromoParagraph />
  </div>
);

export default ServicesPromoDescription;
