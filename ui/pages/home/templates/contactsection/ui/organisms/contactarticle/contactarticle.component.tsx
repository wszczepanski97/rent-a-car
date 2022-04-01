import { FC } from "react";
import { Article } from "../../../../../../../common";
import styles from "./contactarticle.module.scss";

const ContactArticle: FC = () => (
  <Article
    className={styles.contactArticle}
    titleProps={{ title: "Get In Touch", lowerCase: true, as: "h2" }}
  />
);

export default ContactArticle;
