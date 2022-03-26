import { Article } from "../../../../../../../common";
import styles from "./contactarticle.module.css";

const ContactArticle = () => (
  <Article
    className={styles.contactArticle}
    titleProps={{ title: "Get In Touch", lowerCase: true, as: "h2" }}
  />
);

export default ContactArticle;
