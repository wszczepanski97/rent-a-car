import { FC } from "react";
import { ContactCard } from "./molecules";
import { CardRow } from "ui";

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
