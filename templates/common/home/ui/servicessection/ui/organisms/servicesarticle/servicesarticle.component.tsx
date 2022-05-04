import { Article } from "ui";
import styles from "./servicesarticle.module.scss";

const ServicesArticle = () => (
  <Article
    className={styles.servicesArticle}
    titleProps={{
      title: `We are providing best
    car service.`,
      lowerCase: true,
      as: "h2",
    }}
    paragraphProps={{
      paragraphText:
        "Problems trying to resolve between people who don’t want to own cars \nand use it only for a while.",
      as: "p",
    }}
  />
);

export default ServicesArticle;
