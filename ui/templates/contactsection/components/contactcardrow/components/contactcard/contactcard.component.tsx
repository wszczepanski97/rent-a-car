import type { FC } from "react";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import { CardButtonType } from "ui/molecules/card/components/cardbutton/cardbuttontype.enum";
import styles from "./contactcard.module.scss";
import { ContactCardProps } from "./contactcard.props";

const ContactCard: FC<ContactCardProps> = ({ blue = false, photoProps }) => {
  const color = blue ? "var(--light-text-color)" : "var(--text-color)";
  const cardStyles = {
    backgroundColor: blue
      ? "var(--secondary-color-1)"
      : "var(--light-background-color)",
    padding: blue ? "20px" : "12px 20px",
  };
  return (
    <Card
      className={styles.contactCard}
      style={cardStyles}
      photoProps={{ size: { height: "72", width: "72" }, ...photoProps }}
      titleProps={{ title: "Uzyskaj pomoc", as: "h5", color }}
      paragraphProps={{
        paragraphText: "car-lending@example.com",
        as: "h6",
        color,
      }}
      buttonProps={{
        type: CardButtonType.CardButtonWithoutBG,
        buttonText: "Wyślij zgłoszenie",
        color: blue ? "var(--light-text-color)" : "var(--primary-color)",
      }}
      type={CardType.WITH_BUTTON}
    />
  );
};

export default ContactCard;
