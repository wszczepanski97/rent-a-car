import { FC } from "react";
import { Card, CardType, PhotoProps } from "ui";
import { CardButtonType } from "ui/common/molecules/card/ui/atoms/cardbutton/cardbutton.component";
import styles from "./contactcard.module.scss";

const ContactCard: FC<ContactCardProps> = ({ blue = false, photoProps }) => {
  const color = blue ? "var(--light-text-color)" : "var(--text-color)";
  const cardStyles = {
    backgroundColor: blue
      ? "var(--secondary-color-1)"
      : "var(--light-background-color)",
    height: blue ? "369px" : "309px",
    padding: blue ? "80px 40px" : "50px 40px",
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

type ContactCardProps = {
  blue?: boolean;
  photoProps: PhotoProps;
};

export default ContactCard;
