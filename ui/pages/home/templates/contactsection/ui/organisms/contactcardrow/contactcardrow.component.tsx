import { ContactCard } from "./molecules";
import { CardRow } from "../../../../../../../common";
import styles from "./contactcardrow.module.css";

const ContactCardRow = () => (
  <CardRow className={styles.contactCardRow_Container}>
    <ContactCard
      photoProps={{
        src: "/images/Phone.svg",
        alt: "Phone",
      }}
      paragraphProps={{ paragraphText: "car-lending@example.com" }}
      titleProps={{ title: "Get Support" }}
      buttonProps={{ buttonText: "Submit Request" }}
    />
    <ContactCard
      photoProps={{
        src: "/images/Pin.svg",
        alt: "Pin",
      }}
      paragraphProps={{ paragraphText: "car-lending@example.com" }}
      titleProps={{ title: "Get Support" }}
      buttonProps={{ buttonText: "Submit Request" }}
      blue
    />
    <ContactCard
      photoProps={{
        src: "/images/Kite.svg",
        alt: "Kite",
      }}
      paragraphProps={{ paragraphText: "car-lending@example.com" }}
      titleProps={{ title: "Get Support" }}
      buttonProps={{ buttonText: "Submit Request" }}
    />
  </CardRow>
);

export default ContactCardRow;
