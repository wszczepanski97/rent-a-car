import { FC } from "react";
import { ServicesPromoArticle, ServicesPromoParagraph } from "./atoms";
import styles from "./servicespromodescription.module.scss";

const ServicesPromoDescription: FC = () => (
  <div className={styles.servicesPromoDescription}>
    <ServicesPromoArticle />
    <ServicesPromoParagraph />
  </div>
);

export default ServicesPromoDescription;
