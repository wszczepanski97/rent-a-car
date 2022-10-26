import { FC } from "react";
import { ContactCardRow, ContactArticle } from "./ui";
import styles from "./contactsection.module.scss";

const ContactSection: FC = () => (
  <section className={styles.contactSection}>
    <ContactArticle />
    <ContactCardRow />
  </section>
);

export default ContactSection;
