import { ContactCardRow, ContactArticle } from "./ui";
import styles from "./contactsection.module.css";

const ContactSection = () => (
  <section className={styles.contactSection}>
    <ContactArticle />
    <ContactCardRow />
  </section>
);

export default ContactSection;
