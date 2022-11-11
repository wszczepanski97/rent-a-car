import type { FC } from "react";
import CardRow from "ui/molecules/cardrow";
import ContactCard from "./components/contactcard";

const ContactCardRow: FC = () => (
  <CardRow style={{ justifyContent: "center" }}>
    <ContactCard
      photoProps={{
        src: "/images/Phone.svg",
        alt: "Phone",
      }}
    />
    <ContactCard
      photoProps={{
        src: "/images/Pin.svg",
        alt: "Pin",
      }}
      blue
    />
    <ContactCard
      photoProps={{
        src: "/images/Kite.svg",
        alt: "Kite",
      }}
    />
  </CardRow>
);

export default ContactCardRow;
