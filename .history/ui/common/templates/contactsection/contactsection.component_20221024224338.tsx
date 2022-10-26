import { FC } from "react";
import styles from "./contactsection.module.scss";
import { ContactArticle, ContactCardRow } from "./ui";

const ContactSection: FC = () => (
  <section className={styles.contactSection} id="contact-section">
    <ContactArticle />
    <ContactCardRow />
  </section>
);

export default ContactSection;
